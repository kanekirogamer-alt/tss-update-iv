import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('Missing RECAPTCHA_SECRET_KEY environment variable');
    return false;
  }

  try {
    const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data: RecaptchaResponse = await verificationResponse.json();

    // Accept if success is true and score is above 0.5 (0.5+ is likely legitimate)
    return data.success && data.score > 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, recaptchaToken } = request.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return response.status(400).json({ error: 'Toate câmpurile sunt obligatorii.' });
    }

    // Validate reCAPTCHA token if provided
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptchaToken(recaptchaToken);
      if (!isValidRecaptcha) {
        return response.status(400).json({ error: 'Verificarea reCAPTCHA a eșuat. Vă rugăm să încercați din nou.' });
      }
    } else {
      console.warn('No reCAPTCHA token provided - proceeding without validation');
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      return response.status(500).json({ error: 'Configurarea serverului este incompletă (lipsește cheia API).' });
    }

    // Send email via Resend
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.dev>', // Recommended to use a verified domain in production
          to: ['contact@socialskills.ro'],
          subject: `Mesaj Nou Contact: ${subject}`,
          html: `
            <h2>Mesaj nou de pe site-ul Social Skills</h2>
            <p><strong>Nume:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subiect:</strong> ${subject}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      const responseText = await res.text();
      let data;

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('JSON parse error. Response text:', responseText);
        data = {};
      }

      if (res.ok) {
        return response.status(200).json({ success: true, message: 'Mesajul a fost trimis cu succes!' });
      } else {
        console.error('Resend error:', data);
        return response.status(res.status).json({ error: data.message || 'Eroare la trimiterea mesajului.' });
      }
    } catch (resendError) {
      console.error('Resend fetch error:', resendError);
      return response.status(500).json({ error: 'Eroare la conectarea cu serviciul de email.' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return response.status(500).json({ error: 'Eroare internă de server.' });
  }
}
