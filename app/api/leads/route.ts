import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://omcdxpqhnrhgnkxafgtn.supabase.co/functions/v1/webhook-bestpestnyc';

// Dedup store (in-memory — resets on cold start, sufficient for basic protection)
const recentSubmissions = new Map<string, number>();
setInterval(() => {
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (timestamp < tenMinAgo) recentSubmissions.delete(key);
  }
}, 15 * 60 * 1000);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      property_type,
      pest_type,
      description,
      sms_consent,
      source,
      submitted_at,
      page_url,
      honeypot,
      form_started_at,
    } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Timing check (< 3 seconds = bot)
    const now = Date.now();
    const startedAt = Number(form_started_at) || 0;
    if (startedAt && now - startedAt < 3000) {
      return NextResponse.json({ success: true });
    }

    // Phone validation (10 digits required)
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // SMS consent required
    if (!sms_consent) {
      return NextResponse.json({ error: 'SMS consent required' }, { status: 400 });
    }

    // Blocklist check
    const BLOCKED_PHONES = ['2168596131'];
    const BLOCKED_EMAILS = ['susansmi@parallelaid.com'];
    const BLOCKED_DOMAINS = ['parallelaid.com'];
    const cleanEmail = (email || '').trim().toLowerCase();
    if (
      BLOCKED_PHONES.includes(cleanPhone) ||
      BLOCKED_EMAILS.includes(cleanEmail) ||
      BLOCKED_DOMAINS.some((d) => cleanEmail.endsWith('@' + d))
    ) {
      return NextResponse.json({ success: true });
    }

    // Dedup check (same phone within 10 minutes)
    const lastSub = recentSubmissions.get(cleanPhone);
    if (lastSub && now - lastSub < 10 * 60 * 1000) {
      return NextResponse.json({ success: true });
    }
    recentSubmissions.set(cleanPhone, now);

    // Fire CRM webhook
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          property_type,
          pest_type,
          description,
          sms_consent,
          source,
          submitted_at,
          page_url,
        }),
      });
    } catch (e) {
      console.error('Webhook error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
