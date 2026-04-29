// Hardcoded legal pages. Nexus was killed March 10, 2026 — do not import any
// NEXUS_SUPABASE_* env vars. These markdown blocks are the source of truth for
// /privacy and /terms.

export const PRIVACY_POLICY = `# Privacy Policy

*Last updated: 1 March 2026*

Derb 37 is a personal journal published from Marrakech, Morocco. This page
explains what information is collected when you visit the site, why it is
collected, and how it is handled.

## What is collected

**Email address** — only if you choose to subscribe to letters via the form
on the [Letters](/letters) page. Subscription is double opt-in: a
confirmation email is sent, and your email is only added to the list once you
click the link in that email. Your address is stored to send you future
letters and for nothing else.

**Analytics** — aggregate, anonymous traffic data via Google Analytics
(pages viewed, country, device class). No personally identifying data is
attached to analytics events.

**Server logs** — standard request logs (IP address, timestamp, requested
URL) are retained for a short period for security and debugging only.

## What is not collected

- No cookies are set for tracking or advertising.
- No data is sold, rented, or shared with third parties for marketing.
- No third-party advertising networks are embedded on this site.

## Where data is stored

- Subscriber emails are stored in a private Supabase database hosted in the
  EU.
- Email delivery is handled by Resend.
- Analytics is handled by Google.

## Your rights

You can unsubscribe from letters at any time using the link at the bottom of
every email, or by writing to [hello@derb37.com](mailto:hello@derb37.com)
to request that your address be removed.

You may also request a copy of any data held about you, or its deletion, at
the same address.

## Jurisdiction

The site is operated from Morocco. Where applicable, data handling follows
GDPR principles regardless of the visitor's location.

## Contact

For any privacy question, write to
[hello@derb37.com](mailto:hello@derb37.com).
`;

export const TERMS_OF_SERVICE = `# Terms of Service

*Last updated: 1 March 2026*

Derb 37 is a personal journal published from Marrakech, Morocco. By reading
the site you agree to the terms below. They are short on purpose.

## The writing

All text, photographs, and recipes on this site are written and made by
Jacqueline Ng unless otherwise credited. They are shared for personal, non-
commercial reading. You are welcome to cook the recipes for yourself, your
family, and your guests. Please don't republish, syndicate, or repost the
writing or photography elsewhere without asking. A short quote with a link
back is fine.

## Recipes

Recipes are tested in the writer's kitchen and shared in good faith. Cook
with care — adjust for your stove, your salt, your produce. The writer is
not responsible for outcomes that do not turn out the way they did here.

## Letters

The letters list is small and used only to send occasional letters from the
medina. Unsubscribing is a single click in any email.

## Links to other sites

Some posts link to other places — shops, books, kindred journals. Those
sites are independent and the writer is not responsible for their content
or terms.

## Changes

These terms may change. Material changes will be noted at the top of this
page.

## Contact

For anything else, write to
[hello@derb37.com](mailto:hello@derb37.com).

## Jurisdiction

These terms are governed by the laws of the Kingdom of Morocco.
`;
