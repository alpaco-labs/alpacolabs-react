import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS/injection in emails
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Create Supabase admin client for rate limiting
const supabaseAdmin = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_SERVICE_ROLE_KEY ?? ""
);

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour in milliseconds

// Check rate limit for an identifier (IP address)
const checkRateLimit = async (identifier: string): Promise<boolean> => {
  const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  
  try {
    const { count, error: countError } = await supabaseAdmin
      .from('inquiry_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('identifier', identifier)
      .gte('created_at', oneHourAgo);
    
    if (countError) {
      console.error("Rate limit check error:", countError);
      // On error, allow the request but log the issue
      return true;
    }
    
    if (count !== null && count >= RATE_LIMIT_MAX_REQUESTS) {
      console.log(`Rate limit exceeded for identifier: ${identifier}, count: ${count}`);
      return false;
    }
    
    // Record this request
    const { error: insertError } = await supabaseAdmin
      .from('inquiry_rate_limits')
      .insert({ identifier });
    
    if (insertError) {
      console.error("Rate limit insert error:", insertError);
    }
    
    return true;
  } catch (error) {
    console.error("Rate limit error:", error);
    // On error, allow the request but log the issue
    return true;
  }
};

// Verify Cloudflare Turnstile token
const verifyTurnstileToken = async (token: string, clientIP: string): Promise<boolean> => {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY ?? "",
        response: token,
        remoteip: clientIP,
      }),
    });

    const result = await response.json();
    console.log("Turnstile verification result:", result.success);
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
};

// Server-side validation schema
const InquirySchema = z.object({
  imePriimek: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters").trim(),
  podjetje: z.string().max(100, "Company name must be less than 100 characters").trim().optional().nullable(),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").trim(),
  telefon: z.string().max(20, "Phone must be less than 20 characters").trim().optional().nullable(),
  kajPotrebujes: z.enum(["landing", "spletna", "trgovina", "mvp"], { errorMap: () => ({ message: "Invalid project type" }) }),
  podstrani: z.enum(["1", "2-5", "6-10", "10+"], { errorMap: () => ({ message: "Invalid subpages selection" }) }),
  vsebina: z.enum(["da", "delno", "ne"], { errorMap: () => ({ message: "Invalid content selection" }) }),
  funkcionalnosti: z.array(z.enum(["kontakt", "rezervacije", "blog", "jeziki", "newsletter", "placila", "login"])).default([]),
  rok: z.enum(["2-4", "7-10", "asap"], { errorMap: () => ({ message: "Invalid deadline selection" }) }),
  dodatno: z.string().max(2000, "Additional info must be less than 2000 characters").trim().optional().nullable(),
  cenaMin: z.number().int().min(0, "Price must be positive").max(100000, "Price exceeds maximum"),
  cenaMax: z.number().int().min(0, "Price must be positive").max(100000, "Price exceeds maximum"),
  // Honeypot field - should always be empty for real users
  honeypot: z.string().optional().nullable(),
  // Turnstile token for CAPTCHA verification
  turnstileToken: z.string().min(1, "CAPTCHA verification required"),
}).refine((data) => data.cenaMax >= data.cenaMin, {
  message: "Maximum price must be greater than or equal to minimum price",
});

type InquiryEmailRequest = z.infer<typeof InquirySchema>;

const projectTypeLabels: Record<string, string> = {
  landing: "Landing stran",
  spletna: "Spletna stran (več podstrani)",
  trgovina: "Spletna trgovina",
  mvp: "Web / Mobile MVP",
};

const podstraniLabels: Record<string, string> = {
  "1": "1",
  "2-5": "2–5",
  "6-10": "6–10",
  "10+": "10+",
};

const vsebinaLabels: Record<string, string> = {
  da: "Da",
  delno: "Delno",
  ne: "Ne",
};

const funkcionalnostiLabels: Record<string, string> = {
  kontakt: "Kontaktni obrazec",
  rezervacije: "Rezervacije / booking",
  blog: "Blog",
  jeziki: "Več jezikov",
  newsletter: "Newsletter",
  placila: "Plačila (trgovina)",
  login: "Login / uporabniški računi",
};

const rokLabels: Record<string, string> = {
  "2-4": "2–4 tedne",
  "7-10": "7–10 dni",
  asap: "ASAP (3–5 dni)",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    console.log(`Received inquiry request from IP: ${clientIP}`);

    // Check rate limit
    const isAllowed = await checkRateLimit(clientIP);
    if (!isAllowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const rawData = await req.json();
    console.log("Received raw inquiry data");

    // Server-side validation
    const parseResult = InquirySchema.safeParse(rawData);
    
    if (!parseResult.success) {
      console.error("Validation failed:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input data", 
          details: parseResult.error.errors.map(e => e.message) 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data: InquiryEmailRequest = parseResult.data;

    // Honeypot check - if filled, it's likely a bot
    if (data.honeypot) {
      console.log("Honeypot triggered - likely bot submission");
      // Return fake success to not alert the bot
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify Turnstile CAPTCHA token
    const isTurnstileValid = await verifyTurnstileToken(data.turnstileToken, clientIP);
    if (!isTurnstileValid) {
      console.log("Turnstile verification failed");
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed. Please try again." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Received valid inquiry data with verified CAPTCHA");

    const now = new Date();
    const dateStr = now.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Escape all user inputs for safe HTML embedding
    const safeImePriimek = escapeHtml(data.imePriimek);
    const safePodjetje = escapeHtml(data.podjetje || "/");
    const safeEmail = escapeHtml(data.email);
    const safeTelefon = escapeHtml(data.telefon || "/");
    const safeDodatno = data.dodatno ? escapeHtml(data.dodatno).replace(/\n/g, "<br>") : null;

    const funkcionalnostiList = data.funkcionalnosti.length > 0
      ? data.funkcionalnosti.map(f => funkcionalnostiLabels[f] || f).join(", ")
      : "Brez dodatnih funkcionalnosti";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 16px;">
          Novo povpraševanje – ZAN LABS
        </h1>
        
        <p style="color: #666; font-size: 14px;">
          Prejeto: ${dateStr}
        </p>

        <h2 style="color: #1a1a1a; margin-top: 24px;">Kontaktni podatki</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 150px;">Ime in priimek:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${safeImePriimek}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Podjetje:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${safePodjetje}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">
              <a href="mailto:${safeEmail}" style="color: #1a1a1a;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Telefon:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${safeTelefon}</td>
          </tr>
        </table>

        <h2 style="color: #1a1a1a; margin-top: 24px;">Projekt</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 150px;">Tip projekta:</td>
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">
              ${projectTypeLabels[data.kajPotrebujes] || data.kajPotrebujes}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Število podstrani:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${podstraniLabels[data.podstrani] || data.podstrani}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Pripravljena vsebina:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${vsebinaLabels[data.vsebina] || data.vsebina}</td>
          </tr>
        </table>

        <h2 style="color: #1a1a1a; margin-top: 24px;">Funkcionalnosti + Rok</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 150px;">Funkcionalnosti:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${funkcionalnostiList}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Želeni rok:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${rokLabels[data.rok] || data.rok}</td>
          </tr>
        </table>

        ${safeDodatno ? `
        <h2 style="color: #1a1a1a; margin-top: 24px;">Dodatno</h2>
        <p style="color: #1a1a1a; background: #f5f5f5; padding: 16px; border-radius: 8px;">
          ${safeDodatno}
        </p>
        ` : ""}

        <div style="margin-top: 32px; padding: 24px; background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); border-radius: 12px;">
          <h2 style="color: #fff; margin: 0 0 8px 0; font-size: 18px;">📊 Ocena investicije</h2>
          <p style="color: #fff; font-size: 28px; font-weight: bold; margin: 0;">
            €${data.cenaMin} – €${data.cenaMax}
          </p>
          <p style="color: #ccc; font-size: 12px; margin: 8px 0 0 0;">
            Končna cena se potrdi po kratkem klicu.
          </p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 32px; text-align: center;">
          ZAN LABS • Spletne strani, ki prinašajo povpraševanja.
        </p>
      </div>
    `;

    // Send email to owner using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ZAN LABS <onboarding@resend.dev>",
        to: ["zan.pustotnik7@gmail.com"],
        subject: `Novo povpraševanje – ${data.imePriimek}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      // Throw a generic error without exposing API details
      throw new Error("EMAIL_SEND_FAILED");
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry-email function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request. Please try again later.",
        code: "EMAIL_SEND_FAILED"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
