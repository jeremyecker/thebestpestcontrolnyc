import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = 'https://omcdxpqhnrhgnkxafgtn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CRM_WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

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
    const tenMinAgo = new Date(now - 10 * 60 * 1000).toISOString();
    try {
      const dedupRes = await fetch(
        `${SUPABASE_URL}/rest/v1/marketing_leads?customer_phone=eq.${cleanPhone}&created_at=gte.${tenMinAgo}&select=id&limit=1`,
        {
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );
      const existing = await dedupRes.json();
      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json({ success: true });
      }
    } catch (_) {
      // dedup failure is non-blocking
    }

    // Build description from pest_type + message
    const descriptionText = [pest_type, description].filter(Boolean).join(' — ');

    // Insert to marketing_leads in main Supabase project
    const leadData = {
      customer_name: name,
      customer_phone: cleanPhone,
      website: 'thebestpestcontrolnyc.com',
      lead_source: source || 'website',
      api_source: 'thebestpestcontrolnyc',
      description: descriptionText || null,
      customer_address: null,
      status: 'new',
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/marketing_leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(leadData),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      console.error('Supabase insert error:', err);
      // Non-blocking — still fire webhook below
    }

    // Fire CRM webhook (best effort, non-blocking)
    if (CRM_WEBHOOK_URL) {
      fetch(CRM_WEBHOOK_URL, {
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
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
