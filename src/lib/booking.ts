export type PaymentMethod = "cartao" | "pix" | "boleto";
export type Mode = "online" | "presencial";

export type Booking = {
  slug: string;
  lawyerName: string;
  dateISO: string;
  time: string;
  timezone: string;
  area: string;
  subject: string;
  description: string;
  attachments: string[];
  mode: Mode;
  payment: PaymentMethod;
  coupon?: string | undefined;
  price: number;
  discount: number;
  total: number;
  code: string;
};

/** Demo coupons accepted at checkout (percentage off the session price). */
export const COUPONS: Record<string, number> = {
  BEMVINDO10: 10,
  CONSULLEX15: 15,
};

export function applyCoupon(price: number, code: string | undefined) {
  const pct = code ? COUPONS[code.trim().toUpperCase()] : undefined;
  if (!pct) return { valid: false, discount: 0, total: price };
  const discount = Math.round(price * pct) / 100;
  return { valid: true, discount, total: Math.round((price - discount) * 100) / 100 };
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const KEY = "consullex:last-booking";

export function saveBooking(b: Booking) {
  sessionStorage.setItem(KEY, JSON.stringify(b));
}

export function readBooking(): Booking | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking) : null;
  } catch {
    return null;
  }
}

/** Deterministic demo availability so server and browser render the same slots. */
export function slotsFor(seed: number, date: Date): string[] {
  const all = ["08:00", "09:00", "10:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00", "17:30", "18:00", "19:00"];
  const day = date.getDay();
  if (day === 0) return [];
  const key = date.getDate() + date.getMonth() * 31 + seed * 7;
  const picked = all.filter((_, i) => (key * (i + 3) + i * seed) % 3 !== 0);
  return day === 6 ? picked.slice(0, 3) : picked.slice(0, 7);
}
