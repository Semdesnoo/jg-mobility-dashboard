import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import sql from "@/lib/db";

const TO_EMAIL = "info@jgmobility.nl";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();

    // Afspraakformulier
    if (body.type === "appointment") {
      const { email, telefoon, datum, tijd } = body;
      await resend.emails.send({
        from: "JG Mobility Website <noreply@jgmobility.nl>",
        to: TO_EMAIL,
        replyTo: email,
        subject: `Nieuwe afspraak: ${datum} om ${tijd}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #001337; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; font-family: Georgia, serif; margin: 0;">JG Mobility</h1>
              <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0;">Nieuwe afspraakverzoek</p>
            </div>
            <div style="padding: 32px; background: #f8f8f8;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-size: 13px; color: #666; width: 120px;">Datum:</td><td style="padding: 8px 0; font-size: 13px; color: #001337; font-weight: bold;">${datum}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 13px; color: #666;">Tijd:</td><td style="padding: 8px 0; font-size: 13px; color: #001337; font-weight: bold;">${tijd}</td></tr>
                <tr><td style="padding: 8px 0; font-size: 13px; color: #666;">E-mail:</td><td style="padding: 8px 0; font-size: 13px; color: #001337;"><a href="mailto:${email}">${email}</a></td></tr>
                ${telefoon ? `<tr><td style="padding: 8px 0; font-size: 13px; color: #666;">Telefoon:</td><td style="padding: 8px 0; font-size: 13px; color: #001337;">${telefoon}</td></tr>` : ""}
              </table>
            </div>
          </div>
        `,
      });
      return NextResponse.json({ ok: true });
    }

    // Contactformulier
    const { naam, email, telefoon, bericht } = body;

    await resend.emails.send({
      from: "JG Mobility Website <noreply@jgmobility.nl>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nieuw contactbericht van ${naam}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #001337; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; font-family: Georgia, serif; margin: 0;">JG Mobility</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0;">Nieuw contactbericht</p>
          </div>
          <div style="padding: 32px; background: #f8f8f8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-size: 13px; color: #666; width: 120px;">Naam:</td><td style="padding: 8px 0; font-size: 13px; color: #001337; font-weight: bold;">${naam}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #666;">E-mail:</td><td style="padding: 8px 0; font-size: 13px; color: #001337;"><a href="mailto:${email}">${email}</a></td></tr>
              ${telefoon ? `<tr><td style="padding: 8px 0; font-size: 13px; color: #666;">Telefoon:</td><td style="padding: 8px 0; font-size: 13px; color: #001337;">${telefoon}</td></tr>` : ""}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: white; border-left: 3px solid #ffffff; border-radius: 4px;">
              <p style="font-size: 13px; color: #001337; margin: 0; white-space: pre-wrap;">${bericht}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  }

  // Consignatieformulier (multipart/form-data)
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Formulier te groot (foto's verkleinen)" }, { status: 413 });
  }

  const naam = formData.get("naam") as string;
  const email = formData.get("email") as string;
  const telefoon = formData.get("telefoon") as string;
  const merk = formData.get("merk") as string;
  const model = formData.get("model") as string;
  const bouwjaar = formData.get("bouwjaar") as string;
  const km = formData.get("km") as string;
  const vraagprijs = formData.get("vraagprijs") as string;
  const opmerking = formData.get("opmerking") as string;
  const fotos = (formData.getAll("fotos") as File[]).filter(f => f.size > 0);

  const fotoNamen = fotos.filter(f => f.size > 0).map(f => `• ${f.name} (${(f.size / 1024).toFixed(0)} KB)`).join("<br/>");

  const mailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #001337; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; font-family: Georgia, serif; margin: 0;">JG Mobility</h1>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 8px 0 0;">Nieuwe consignatie-aanvraag</p>
      </div>
      <div style="padding: 32px; background: #f8f8f8;">
        <h2 style="color: #001337; font-family: Georgia, serif; font-size: 18px; margin: 0 0 16px;">Aanbieder</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; font-size: 13px; color: #666; width: 120px;">Naam:</td><td style="padding: 6px 0; font-size: 13px; color: #001337; font-weight: bold;">${naam}</td></tr>
          <tr><td style="padding: 6px 0; font-size: 13px; color: #666;">E-mail:</td><td style="padding: 6px 0; font-size: 13px; color: #001337;"><a href="mailto:${email}">${email}</a></td></tr>
          ${telefoon ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #666;">Telefoon:</td><td style="padding: 6px 0; font-size: 13px; color: #001337;">${telefoon}</td></tr>` : ""}
        </table>
        <h2 style="color: #001337; font-family: Georgia, serif; font-size: 18px; margin: 0 0 16px;">Auto</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; font-size: 13px; color: #666; width: 120px;">Merk & Model:</td><td style="padding: 6px 0; font-size: 13px; color: #001337; font-weight: bold;">${merk} ${model}</td></tr>
          <tr><td style="padding: 6px 0; font-size: 13px; color: #666;">Bouwjaar:</td><td style="padding: 6px 0; font-size: 13px; color: #001337;">${bouwjaar}</td></tr>
          <tr><td style="padding: 6px 0; font-size: 13px; color: #666;">Kilometerstand:</td><td style="padding: 6px 0; font-size: 13px; color: #001337;">${parseInt(km).toLocaleString("nl-NL")} km</td></tr>
          ${vraagprijs ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #666;">Vraagprijs:</td><td style="padding: 6px 0; font-size: 13px; color: #001337;">€${parseInt(vraagprijs).toLocaleString("nl-NL")}</td></tr>` : ""}
        </table>
        ${opmerking ? `<div style="padding: 16px; background: white; border-left: 3px solid #001337; border-radius: 4px; margin-bottom: 16px;"><p style="font-size: 13px; color: #001337; margin: 0; white-space: pre-wrap;">${opmerking}</p></div>` : ""}
        ${fotoNamen ? `<div style="padding: 16px; background: white; border-radius: 4px;"><p style="font-size: 12px; color: #666; margin: 0 0 6px;">Bijgevoegde foto's:</p><p style="font-size: 12px; color: #001337; margin: 0;">${fotoNamen}</p></div>` : ""}
      </div>
    </div>
  `;

  // Stap 1: stuur altijd de hoofdmail (zonder foto's) — gegarandeerde levering
  const result = await resend.emails.send({
    from: "JG Mobility Website <noreply@jgmobility.nl>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `Nieuwe consignatie-aanvraag: ${merk} ${model} (${bouwjaar})`,
    html: mailHtml,
  });
  if (result.error) {
    console.error("Resend fout:", result.error);
    return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
  }

  // Sla op in database
  try {
    const now = new Date();
    const id = `cos_${Date.now()}`;
    const datum = now.toLocaleDateString("nl-NL");
    const tijd = now.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    await sql`
      INSERT INTO cosignaties (id, datum, tijd, naam, email, telefoon, merk, model, bouwjaar, km, vraagprijs, opmerking, aantal_fotos)
      VALUES (${id}, ${datum}, ${tijd}, ${naam ?? ""}, ${email ?? ""}, ${telefoon ?? ""}, ${merk ?? ""}, ${model ?? ""}, ${bouwjaar ?? ""}, ${km ?? ""}, ${vraagprijs ?? ""}, ${opmerking ?? ""}, ${fotos.length})
    `;
  } catch {
    // DB opslaan mislukt → mail is al verstuurd, geen blocker
  }

  // Stap 2: probeer foto's als bijlage in aparte mail — fout hier stopt de bevestiging niet
  const geldigeFotos = fotos.filter(f => f.size > 0);
  if (geldigeFotos.length > 0) {
    try {
      const bijlagen: { filename: string; content: string }[] = [];
      let totaal = 0;
      for (const foto of geldigeFotos) {
        if (totaal + foto.size > 3.5 * 1024 * 1024) break;
        totaal += foto.size;
        const buf = await foto.arrayBuffer();
        bijlagen.push({ filename: foto.name, content: Buffer.from(buf).toString("base64") });
      }
      if (bijlagen.length > 0) {
        await resend.emails.send({
          from: "JG Mobility Website <noreply@jgmobility.nl>",
          to: TO_EMAIL,
          replyTo: email,
          subject: `Foto's bij consignatie: ${merk} ${model} (${naam})`,
          html: `<p style="font-family:Arial;font-size:13px;color:#001337;">Zie bijlagen voor de foto's van de ${merk} ${model} van ${naam}.</p>`,
          attachments: bijlagen.map(b => ({ filename: b.filename, content: b.content })),
        });
      }
    } catch {
      // foto-mail mislukt → hoofdmail is al verstuurd, geen probleem
    }
  }

  return NextResponse.json({ ok: true });
}
