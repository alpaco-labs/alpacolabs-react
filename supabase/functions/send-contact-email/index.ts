import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

// Server-side validation schema
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  company: z.string().max(100).trim().optional().nullable(),
  phone: z.string().max(30).trim().optional().nullable(),
  email: z.string().email("Invalid email address").max(255).trim(),
  message: z.string().max(2000).trim().optional().nullable(),
  packageName: z.string().max(100).trim().optional().nullable(),
});

type ContactEmailRequest = z.infer<typeof ContactSchema>;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    console.log("Received contact form submission");

    // Server-side validation
    const parseResult = ContactSchema.safeParse(rawData);
    
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

    const data: ContactEmailRequest = parseResult.data;

    const now = new Date();
    const dateStr = now.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Escape all user inputs for safe HTML embedding
    const safeName = escapeHtml(data.name);
    const safeCompany = escapeHtml(data.company || "/");
    const safePhone = escapeHtml(data.phone || "/");
    const safeEmail = escapeHtml(data.email);
    const safeMessage = data.message ? escapeHtml(data.message).replace(/\n/g, "<br>") : "/";
    const safePackageName = data.packageName ? escapeHtml(data.packageName) : null;

    // Build plain text email body (no escaping needed for plain text)
    const emailText = `Novo povpraševanje – Alpaco Labs

Prejeto: ${dateStr}

Ime in priimek:
${data.name}

Ime podjetja:
${data.company || "/"}

Telefonska številka:
${data.phone || "/"}

Email:
${data.email}

Sporočilo uporabnika:
${data.message || "/"}

${data.packageName ? `Paket: ${data.packageName}` : ""}
`.trim();

    // Build HTML email body with escaped user inputs
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px;">
          Novo povpraševanje – Alpaco Labs
        </h1>
        
        <p style="color: #666; font-size: 14px; margin-bottom: 24px;">
          Prejeto: ${dateStr}
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; color: #666; width: 180px; vertical-align: top; border-bottom: 1px solid #eee;">Ime in priimek:</td>
            <td style="padding: 12px 0; color: #1a1a1a; font-weight: 500; border-bottom: 1px solid #eee;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; vertical-align: top; border-bottom: 1px solid #eee;">Ime podjetja:</td>
            <td style="padding: 12px 0; color: #1a1a1a; border-bottom: 1px solid #eee;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; vertical-align: top; border-bottom: 1px solid #eee;">Telefonska številka:</td>
            <td style="padding: 12px 0; color: #1a1a1a; border-bottom: 1px solid #eee;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; vertical-align: top; border-bottom: 1px solid #eee;">Email:</td>
            <td style="padding: 12px 0; color: #1a1a1a; border-bottom: 1px solid #eee;">
              <a href="mailto:${safeEmail}" style="color: #1a1a1a;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; vertical-align: top;">Sporočilo uporabnika:</td>
            <td style="padding: 12px 0; color: #1a1a1a;">${safeMessage}</td>
          </tr>
        </table>

        ${safePackageName ? `
        <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <strong>Paket:</strong> ${safePackageName}
        </div>
        ` : ""}

        <p style="color: #999; font-size: 12px; margin-top: 32px; text-align: center;">
          Alpaco Labs • Spletne strani, ki prinašajo povpraševanja.
        </p>
      </div>
    `;

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Alpaco Labs <onboarding@resend.dev>",
        to: ["info@alpacolabs.com"],
        reply_to: data.email,
        subject: `Novo povpraševanje – Alpaco Labs`,
        text: emailText,
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
    console.error("Error in send-contact-email function:", error);
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
