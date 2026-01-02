import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  imePriimek: string;
  podjetje: string;
  email: string;
  telefon: string;
  kajPotrebujes: string;
  podstrani: string;
  vsebina: string;
  funkcionalnosti: string[];
  rok: string;
  dodatno: string;
  cenaMin: number;
  cenaMax: number;
}

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
    const data: InquiryEmailRequest = await req.json();
    console.log("Received inquiry data:", data);

    const now = new Date();
    const dateStr = now.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
            <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${data.imePriimek}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Podjetje:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${data.podjetje || "/"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">
              <a href="mailto:${data.email}" style="color: #1a1a1a;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Telefon:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${data.telefon || "/"}</td>
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

        ${data.dodatno ? `
        <h2 style="color: #1a1a1a; margin-top: 24px;">Dodatno</h2>
        <p style="color: #1a1a1a; background: #f5f5f5; padding: 16px; border-radius: 8px;">
          ${data.dodatno.replace(/\n/g, "<br>")}
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
        to: ["zan@email.com"], // Replace with actual email
        subject: `Novo povpraševanje – ${data.imePriimek}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
