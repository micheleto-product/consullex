import pedro from "@/assets/adv-pedro.jpg";
import juliana from "@/assets/adv-juliana.jpg";
import renata from "@/assets/adv-renata.jpg";
import leandro from "@/assets/adv-leandro.jpg";
import rafael from "@/assets/adv-rafael.jpg";
import helena from "@/assets/adv-helena.jpg";
import blogContrato from "@/assets/blog-contrato.jpg";
import blogDigital from "@/assets/blog-digital.jpg";
import empresaReuniao from "@/assets/empresa-reuniao.jpg";
import {
  Briefcase,
  Building2,
  FileSignature,
  HeartHandshake,
  Home,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Area = {
  slug: string;
  name: string;
  icon: LucideIcon;
  short: string;
  audience: "pf" | "pj" | "ambos";
};

export const AREAS: Area[] = [
  { slug: "familia", name: "Família e Sucessões", icon: HeartHandshake, short: "Divórcio, guarda, pensão, inventário e planejamento sucessório.", audience: "pf" },
  { slug: "consumidor", name: "Direito do Consumidor", icon: ShoppingBag, short: "Cobranças indevidas, voos, bancos, produtos com defeito.", audience: "pf" },
  { slug: "trabalhista", name: "Trabalhista", icon: Briefcase, short: "Rescisões, verbas, horas extras e prevenção de passivos.", audience: "ambos" },
  { slug: "imobiliario", name: "Imobiliário", icon: Home, short: "Locação, compra e venda, regularização e distratos.", audience: "ambos" },
  { slug: "empresarial", name: "Empresarial e Societário", icon: Building2, short: "Contratos sociais, acordos de sócios, M&A e governança.", audience: "pj" },
  { slug: "tributario", name: "Tributário", icon: Landmark, short: "Planejamento tributário e defesa em autuações fiscais.", audience: "pj" },
  { slug: "digital-lgpd", name: "Digital e LGPD", icon: ShieldCheck, short: "Adequação à LGPD, privacidade e incidentes de dados.", audience: "ambos" },
  { slug: "contratos", name: "Contratos", icon: FileSignature, short: "Elaboração e revisão de contratos com segurança.", audience: "ambos" },
  { slug: "previdenciario", name: "Previdenciário", icon: Users, short: "Aposentadoria, benefícios do INSS e revisões.", audience: "pf" },
];

export type Lawyer = {
  slug: string;
  name: string;
  photo: string;
  area: string; // area slug
  headline: string;
  specialties: string[];
  oab: string;
  city: string;
  state: string;
  years: number;
  rating: number;
  reviews: number;
  sessions: number;
  price: number;
  duration: number;
  modes: ("online" | "presencial")[];
  languages: string[];
  bio: string;
  about: string;
  education: string[];
  postgrad: string[];
  experience: { role: string; place: string; period: string }[];
  commissions: string[];
  office?: string;
  isNew?: boolean;
  availableNow?: boolean;
  testimonials: { name: string; text: string; rating: number; date: string }[];
};

export const LAWYERS: Lawyer[] = [
  {
    slug: "pedro-hayden",
    name: "Dr. Pedro Hayden",
    photo: pedro,
    area: "empresarial",
    headline: "Direito Societário e Contratos Empresariais",
    specialties: ["M&A", "Acordo de sócios", "Due diligence", "Contratos"],
    oab: "OAB/SP 123.456",
    city: "São Paulo",
    state: "SP",
    years: 12,
    rating: 4.9,
    reviews: 48,
    sessions: 312,
    price: 350,
    duration: 50,
    modes: ["online", "presencial"],
    languages: ["Português", "Inglês"],
    bio: "Atuo na estruturação de sociedades, acordos de sócios e operações de M&A para empresas familiares e startups em rodadas de investimento.",
    about:
      "Acredito que o bom contrato é aquele que evita o conflito. Há mais de 12 anos ajudo empreendedores a estruturar sociedades com clareza, organizar a entrada de investidores e proteger o patrimônio da empresa. Explico cada cláusula em linguagem simples, para que você tome decisões com tranquilidade.",
    education: ["Bacharel em Direito — Universidade de São Paulo (USP)"],
    postgrad: ["LL.M. em Direito Societário — FGV Direito SP", "Curso de Governança Corporativa — IBGC"],
    experience: [
      { role: "Sócio fundador", place: "Hayden Advocacia Empresarial", period: "2017 — atual" },
      { role: "Advogado sênior", place: "Escritório full service em São Paulo", period: "2012 — 2017" },
    ],
    commissions: ["Comissão de Direito Empresarial — OAB/SP", "Comissão de Startups — OAB/SP"],
    office: "Av. Paulista, 1000 — Bela Vista, São Paulo/SP",
    availableNow: true,
    testimonials: [
      { name: "Marcos A.", text: "Explicou o acordo de sócios ponto a ponto. Fechamos a rodada com segurança.", rating: 5, date: "Out 2026" },
      { name: "Fernanda L.", text: "Muito objetivo e atencioso. Resolveu em uma sessão o que eu tentava entender há meses.", rating: 5, date: "Set 2026" },
    ],
  },
  {
    slug: "juliana-meireles",
    name: "Dra. Juliana Meireles",
    photo: juliana,
    area: "digital-lgpd",
    headline: "Direito Digital, Privacidade e LGPD",
    specialties: ["Adequação à LGPD", "Contratos de TI", "Incidentes de dados", "Compliance"],
    oab: "OAB/RJ 98.765",
    city: "Rio de Janeiro",
    state: "RJ",
    years: 8,
    rating: 5,
    reviews: 31,
    sessions: 164,
    price: 280,
    duration: 50,
    modes: ["online"],
    languages: ["Português", "Inglês", "Espanhol"],
    bio: "Certificada CIPP/E. Ajudo empresas e pessoas a protegerem seus dados, revisarem políticas de privacidade e responderem a incidentes.",
    about:
      "Trabalho com proteção de dados desde a entrada em vigor da LGPD. Atendo tanto empresas que precisam se adequar quanto pessoas que tiveram seus dados expostos. Meu foco é traduzir a lei em ações práticas e proporcionais à sua realidade.",
    education: ["Bacharel em Direito — PUC-Rio"],
    postgrad: ["Especialização em Direito Digital — UERJ", "Certificação CIPP/E — IAPP"],
    experience: [
      { role: "Consultora de privacidade", place: "Atuação independente", period: "2020 — atual" },
      { role: "Advogada", place: "Departamento jurídico de empresa de tecnologia", period: "2018 — 2020" },
    ],
    commissions: ["Comissão de Proteção de Dados — OAB/RJ"],
    isNew: true,
    availableNow: true,
    testimonials: [
      { name: "Clínica Vida", text: "Adequamos a clínica à LGPD sem complicação. Excelente didática.", rating: 5, date: "Out 2026" },
      { name: "Paulo R.", text: "Me orientou com rapidez após um vazamento de dados. Fiquei muito mais tranquilo.", rating: 5, date: "Ago 2026" },
    ],
  },
  {
    slug: "renata-oliveira",
    name: "Dra. Renata Oliveira",
    photo: renata,
    area: "familia",
    headline: "Família e Sucessões com escuta acolhedora",
    specialties: ["Divórcio", "Guarda e convivência", "Pensão alimentícia", "Inventário"],
    oab: "OAB/MG 87.210",
    city: "Belo Horizonte",
    state: "MG",
    years: 15,
    rating: 4.9,
    reviews: 76,
    sessions: 540,
    price: 260,
    duration: 50,
    modes: ["online", "presencial"],
    languages: ["Português"],
    bio: "Mediadora certificada. Conduzo divórcios, guarda e inventários priorizando acordos, discrição e o bem-estar de toda a família.",
    about:
      "Momentos de mudança na família pedem cuidado. Em 15 anos de atuação, aprendi que ouvir com atenção é o primeiro passo para encontrar a melhor saída. Sempre que possível, busco o caminho do acordo, mais rápido e menos desgastante para todos.",
    education: ["Bacharel em Direito — UFMG"],
    postgrad: ["Especialização em Direito de Família e Sucessões — PUC Minas", "Formação em Mediação de Conflitos — CNJ"],
    experience: [
      { role: "Advogada titular", place: "Oliveira Advocacia de Família", period: "2014 — atual" },
      { role: "Mediadora voluntária", place: "Centro Judiciário de Solução de Conflitos", period: "2016 — 2020" },
    ],
    commissions: ["Comissão de Direito de Família — OAB/MG", "IBDFAM — Membro"],
    office: "Rua da Bahia, 1200 — Centro, Belo Horizonte/MG",
    testimonials: [
      { name: "Luciana M.", text: "Me senti acolhida desde a primeira conversa. Resolvemos tudo em acordo.", rating: 5, date: "Out 2026" },
      { name: "André S.", text: "Profissional sensível e muito competente no inventário da minha família.", rating: 5, date: "Jul 2026" },
    ],
  },
  {
    slug: "leandro-quintela",
    name: "Dr. Leandro Quintela",
    photo: leandro,
    area: "tributario",
    headline: "Planejamento Tributário e Defesa Fiscal",
    specialties: ["Planejamento tributário", "Defesa em autuações", "Recuperação de créditos", "Reforma tributária"],
    oab: "OAB/MG 112.334",
    city: "Belo Horizonte",
    state: "MG",
    years: 22,
    rating: 5,
    reviews: 45,
    sessions: 320,
    price: 500,
    duration: 60,
    modes: ["online", "presencial"],
    languages: ["Português", "Inglês"],
    bio: "Mestre em Direito Tributário. Auxilio empresas na redução legal da carga tributária e na defesa contra autuações fiscais.",
    about:
      "Ajudo empresas a pagar o tributo correto — nem mais, nem menos. Com mais de duas décadas de experiência, analiso a operação, identifico oportunidades legais de economia e acompanho a transição para o novo sistema da reforma tributária.",
    education: ["Bacharel em Direito — UFMG"],
    postgrad: ["Mestrado em Direito Tributário — PUC-SP", "MBA em Gestão Tributária — FIPECAFI"],
    experience: [
      { role: "Sócio", place: "Quintela & Associados", period: "2010 — atual" },
      { role: "Consultor tributário", place: "Big Four", period: "2004 — 2010" },
    ],
    commissions: ["Comissão de Direito Tributário — OAB/MG"],
    office: "Av. do Contorno, 6000 — Savassi, Belo Horizonte/MG",
    testimonials: [
      { name: "Atlas Indústria", text: "Revisão tributária muito bem fundamentada. Resultado concreto já no primeiro trimestre.", rating: 5, date: "Set 2026" },
      { name: "Ricardo P.", text: "Explicação clara sobre a reforma e o impacto no meu negócio.", rating: 5, date: "Jun 2026" },
    ],
  },
  {
    slug: "rafael-santos",
    name: "Dr. Rafael Santos",
    photo: rafael,
    area: "consumidor",
    headline: "Direito do Consumidor e Bancário",
    specialties: ["Cobranças indevidas", "Problemas com voos", "Fraudes bancárias", "Nome negativado"],
    oab: "OAB/PE 54.871",
    city: "Recife",
    state: "PE",
    years: 6,
    rating: 4.8,
    reviews: 52,
    sessions: 280,
    price: 180,
    duration: 40,
    modes: ["online"],
    languages: ["Português", "Espanhol"],
    bio: "Defendo consumidores contra cobranças abusivas, falhas de companhias aéreas, bancos e operadoras, com atendimento ágil e 100% online.",
    about:
      "Sei como é frustrante ter um problema com uma empresa e não ser ouvido. Analiso seu caso, explico seus direitos e indico o caminho mais adequado — seja uma negociação, uma reclamação formal ou uma ação judicial.",
    education: ["Bacharel em Direito — UFPE"],
    postgrad: ["Especialização em Direito do Consumidor — ESA OAB/PE"],
    experience: [{ role: "Advogado", place: "Atuação independente", period: "2020 — atual" }],
    commissions: ["Comissão de Defesa do Consumidor — OAB/PE"],
    isNew: true,
    availableNow: true,
    testimonials: [
      { name: "Mariana S.", text: "Atendimento rápido, cirúrgico e humano. Reverti a cobrança indevida em poucos dias.", rating: 5, date: "Out 2026" },
      { name: "João V.", text: "Me orientou sobre o voo cancelado com muita clareza.", rating: 5, date: "Set 2026" },
    ],
  },
  {
    slug: "helena-tanaka",
    name: "Dra. Helena Tanaka",
    photo: helena,
    area: "trabalhista",
    headline: "Trabalhista consultivo para pessoas e empresas",
    specialties: ["Rescisões", "Prevenção de passivos", "Home office", "Assédio moral"],
    oab: "OAB/SP 145.902",
    city: "Campinas",
    state: "SP",
    years: 14,
    rating: 4.9,
    reviews: 63,
    sessions: 410,
    price: 320,
    duration: 50,
    modes: ["online", "presencial"],
    languages: ["Português", "Inglês", "Japonês"],
    bio: "Oriento trabalhadores e empresas em rescisões, políticas internas e prevenção de passivos, com foco em soluções equilibradas.",
    about:
      "Atendo os dois lados da relação de trabalho, o que me dá uma visão completa para propor soluções justas. Para empresas, estruturo políticas e treinamentos; para trabalhadores, analiso rescisões e direitos com transparência.",
    education: ["Bacharel em Direito — Unicamp"],
    postgrad: ["Especialização em Direito do Trabalho — PUC Campinas", "Curso de Compliance Trabalhista — Insper"],
    experience: [
      { role: "Advogada titular", place: "Tanaka Advocacia Trabalhista", period: "2015 — atual" },
      { role: "Advogada", place: "Jurídico interno de multinacional", period: "2011 — 2015" },
    ],
    commissions: ["Comissão de Direito do Trabalho — OAB/SP"],
    office: "Rua Barão de Jaguara, 900 — Centro, Campinas/SP",
    testimonials: [
      { name: "Omni Logística", text: "Reduzimos reclamações trabalhistas com as políticas que ela estruturou.", rating: 5, date: "Ago 2026" },
      { name: "Patrícia G.", text: "Revisou minha rescisão e encontrou valores que eu não sabia que tinha direito.", rating: 5, date: "Jul 2026" },
    ],
  },
];

export const getLawyer = (slug: string) => LAWYERS.find((l) => l.slug === slug);
/** For demo data that references a lawyer that is known to exist. */
export function mustLawyer(slug: string): Lawyer {
  const l = getLawyer(slug);
  if (!l) throw new Error(`Unknown lawyer: ${slug}`);
  return l;
}
export const areaName = (slug: string) => AREAS.find((a) => a.slug === slug)?.name ?? slug;

export const STATES = ["SP", "RJ", "MG", "PE"];
export const LANGUAGES = ["Português", "Inglês", "Espanhol", "Japonês"];

export const TESTIMONIALS = [
  {
    quote:
      "Em um momento de crescimento, a Consullex nos ajudou a reduzir riscos rapidamente. Nossos líderes embasam decisões contratuais e o RH tem suporte completo em questões trabalhistas.",
    name: "Daniel Kobata",
    role: "Diretor de Operações · Nexus Corp",
  },
  {
    quote:
      "Tive um problema sério com uma instituição financeira e o atendimento foi rápido e humano. Entendi meus direitos e resolvi a situação em poucos dias.",
    name: "Mariana Silveira",
    role: "Cliente · Direito do Consumidor",
  },
  {
    quote:
      "O benefício que mais contribuiu para a atração de talentos seniores na nossa empresa. As pessoas valorizam ter a quem perguntar.",
    name: "Isabela Nascimento",
    role: "Head of People & Culture · Vanguard Tech",
  },
];

export const FAQ = [
  { q: "Como a Consullex escolhe os advogados?", a: "Todos os profissionais passam por verificação de inscrição ativa na OAB, análise de formação e experiência e entrevista. Avaliações dos clientes são acompanhadas continuamente." },
  { q: "A consulta pode ser online?", a: "Sim. Você escolhe entre atendimento por videochamada, de qualquer lugar, ou presencial no escritório do advogado, quando disponível." },
  { q: "Quanto custa uma consulta?", a: "Cada advogado define o valor da sua sessão, exibido de forma transparente no perfil antes do agendamento. Não há taxas escondidas." },
  { q: "A plataforma segue as regras da OAB?", a: "Sim. A Consullex não capta clientes de forma irregular nem promete resultados. Somos um ambiente de conexão ética entre você e profissionais independentes." },
  { q: "Meus dados e documentos ficam seguros?", a: "Usamos criptografia e seguimos a LGPD. Seus documentos são compartilhados apenas com o advogado escolhido." },
  { q: "Como funciona para empresas?", a: "Oferecemos planos de benefício jurídico para colaboradores e suporte consultivo para a empresa, com painel de gestão e relatórios mensais." },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Artigo" | "Guia" | "Vídeo" | "Notícia" | "E-book";
  readTime: string;
  image: string;
  date: string;
};

export const POSTS: Post[] = [
  { slug: "compliance-preventivo", title: "O que incluir no seu programa de compliance preventivo", excerpt: "Um roteiro simples para começar a organizar riscos e responsabilidades na sua empresa.", category: "Guia", readTime: "7 min de leitura", image: blogContrato, date: "12 nov 2026" },
  { slug: "consulta-online", title: "Consulta jurídica online: como se preparar para aproveitar melhor", excerpt: "Documentos, perguntas e cuidados para que sua sessão por vídeo seja produtiva.", category: "Artigo", readTime: "5 min de leitura", image: blogDigital, date: "5 nov 2026" },
  { slug: "passivos-home-office", title: "Vamos falar sobre passivos trabalhistas no home office?", excerpt: "Jornada, equipamentos e ergonomia: o que a empresa precisa observar.", category: "Vídeo", readTime: "32 min de vídeo", image: empresaReuniao, date: "28 out 2026" },
];

export const CLIENT_LOGOS = ["Nexus Corp", "Vanguard Tech", "Omni Logística", "Atlas Indústria", "Quantum Seguros", "Aurora Saúde"];
