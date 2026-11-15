import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Olá! Gostaria de ajuda para encontrar um advogado na Consullex.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-3 text-sm font-semibold text-on-dark shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-emerald-bright"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}
