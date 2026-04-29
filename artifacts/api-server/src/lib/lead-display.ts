/**
 * Helpers for converting raw lead inputs into safe, public-display strings.
 * Shared between the synchronous lead-create / leads-recent endpoints and the
 * lead_events realtime broadcast row, so the realtime payload renders the
 * same name/city the REST endpoint would.
 */

const FIRST_NAMES = [
  "Aisha",
  "Brian",
  "Cynthia",
  "David",
  "Esther",
  "Faith",
  "George",
  "Halima",
  "Ian",
  "Joyce",
  "Kevin",
  "Lillian",
  "Mwangi",
  "Nadia",
  "Otieno",
  "Pamela",
  "Quincy",
  "Ruth",
  "Samira",
  "Tabitha",
  "Umar",
  "Violet",
  "Wanjiku",
  "Yusuf",
  "Zainab",
];

const CITIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Machakos",
  "Kampala",
  "Dar es Salaam",
  "Lagos",
  "Accra",
  "Kigali",
];

export function anonymizeName(input: string, id: string): string {
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  const first = FIRST_NAMES[seed % FIRST_NAMES.length] ?? "Friend";
  const initial = input.replace(/[^a-zA-Z]/g, "").charAt(0).toUpperCase() || "M";
  return `${first} ${initial}.`;
}

export function pickCity(id: string): string {
  const seed = id.charCodeAt(0) + id.charCodeAt(2 % id.length);
  return CITIES[seed % CITIES.length] ?? "Nairobi";
}
