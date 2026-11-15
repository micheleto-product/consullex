import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Consullex" },
      { name: "description", content: "Condições de uso da plataforma Consullex para clientes, empresas e advogados." },
      { property: "og:title", content: "Termos de Uso | Consullex" },
      { property: "og:description", content: "Condições de uso da plataforma Consullex." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Termos de Uso"
      intro="Regras claras para uma relação de confiança entre você, os advogados e a Consullex."
      sections={[
        ["Sobre a plataforma", "A Consullex é um ambiente tecnológico que conecta clientes a advogados independentes, com inscrição ativa na OAB. A Consullex não presta serviços advocatícios diretamente."],
        ["Cadastro", "Você é responsável pela veracidade das informações fornecidas e pela guarda da sua senha. Empresas devem informar CNPJ válido e responsável legal."],
        ["Agendamentos e pagamentos", "Os valores das consultas são definidos pelos advogados e exibidos antes da contratação. Cancelamentos com mais de 24 horas de antecedência são reembolsados integralmente."],
        ["Conduta ética", "Todos os usuários devem agir com respeito e boa-fé. Advogados seguem o Código de Ética e Disciplina da OAB e não podem prometer resultados."],
        ["Responsabilidades", "A orientação jurídica é de responsabilidade exclusiva do advogado contratado. A Consullex responde pelo funcionamento da plataforma."],
        ["Alterações", "Estes termos podem ser atualizados. Avisaremos sobre mudanças relevantes pelo e-mail cadastrado."],
      ]}
    />
  ),
});
