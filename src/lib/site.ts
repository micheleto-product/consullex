// Contact details shown across the site. Placeholder values — replace with the real ones.
export const SITE = {
  name: "Consullex",
  tagline: "Conectando você ao direito, com ética e tecnologia.",
  email: "contato@consullex.com.br",
  phoneDisplay: "(11) 4000-0000",
  whatsappNumber: "5511900000000",
  hours: "Segunda a sexta, das 9h às 18h",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
