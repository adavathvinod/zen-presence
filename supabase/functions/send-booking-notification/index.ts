import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userName, companionName, bookingDate, startTime, venueName, totalAmount } = await req.json();

    console.log("Sending booking notification email...");

    const emailResponse = await resend.emails.send({
      from: "Sathi <onboarding@resend.dev>",
      to: ["hyenabusiness01@gmail.com"],
      subject: `New Booking Request - ${companionName}`,
      html: `
        <h1>New Booking Request</h1>
        <p><strong>Client:</strong> ${userName}</p>
        <p><strong>Companion:</strong> ${companionName}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p><strong>Time:</strong> ${startTime}</p>
        <p><strong>Venue:</strong> ${venueName}</p>
        <p><strong>Amount:</strong> ₹${totalAmount}</p>
        <hr>
        <p>Please review and confirm this booking.</p>
      `,
    });

    console.log("Email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
