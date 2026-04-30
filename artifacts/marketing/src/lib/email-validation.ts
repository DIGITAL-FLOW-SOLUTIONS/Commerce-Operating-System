const EMAIL_RE = /^[^\s@]+@([^\s@]+\.[^\s@]{2,})$/i;

const DISPOSABLE_DOMAINS = new Set<string>([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.com",
  "tempmail.org",
  "tempmailo.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamailblock.com",
  "10minutemail.com",
  "10minutemail.net",
  "20minutemail.com",
  "yopmail.com",
  "yopmail.net",
  "yopmail.fr",
  "throwawaymail.com",
  "maildrop.cc",
  "getnada.com",
  "nada.email",
  "trashmail.com",
  "trashmail.net",
  "trashmail.de",
  "fakemail.net",
  "fakeinbox.com",
  "dispostable.com",
  "sharklasers.com",
  "discard.email",
  "mintemail.com",
  "emailondeck.com",
  "mailnesia.com",
  "inboxbear.com",
  "moakt.com",
  "spambox.us",
  "spam4.me",
  "mailcatch.com",
  "mailsac.com",
  "byom.de",
  "trash-mail.com",
  "mvrht.net",
  "mt2015.com",
  "mt2014.com",
  "mailtemp.info",
  "tmpeml.com",
  "tmail.ws",
  "minuteinbox.com",
  "tempemail.com",
  "tempemail.net",
  "throwam.com",
  "wegwerfmail.de",
  "mohmal.com",
  "mytemp.email",
  "anonbox.net",
  "burnermail.io",
]);

export type EmailValidationResult =
  | { ok: true; normalized: string }
  | { ok: false; reason: "format" | "disposable" };

export function validateEmail(input: string): EmailValidationResult {
  const trimmed = input.trim().toLowerCase();
  const match = EMAIL_RE.exec(trimmed);
  if (!match) {
    return { ok: false, reason: "format" };
  }
  const domain = match[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "disposable" };
  }
  return { ok: true, normalized: trimmed };
}

export function emailErrorMessage(reason: "format" | "disposable"): string {
  if (reason === "disposable") {
    return "Temporary or disposable email addresses aren't allowed. Please use your real inbox.";
  }
  return "That doesn't look like a valid email. Try again.";
}
