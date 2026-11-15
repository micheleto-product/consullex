import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Consullex" },
      { name: "description", content: "Como a Consullex coleta, usa e protege seus dados pessoais, em conformidade com a LGPD." },
      { property: "og:title", content: "Política de Privacidade | Consullex" },
      { property: "og:description", content: "Proteção de dados em conformidade com a LGPD." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de Privacidade"
      intro="Seus dados são tratados com sigilo, transparência e em conformidade com a Lei Geral de Proteção de Dados."
      sections={[
        ["Dados que coletamos", "Dados de cadastro (nome, CPF ou CNPJ, e-mail, telefone), informações das consultas e documentos que você decide compartilhar."],
        ["Como usamos", "Para viabilizar agendamentos, pagamentos, comunicação com o advogado escolhido e melhoria da plataforma. Não vendemos seus dados."],
        ["Compartilhamento", "Descrições e anexos da consulta são compartilhados apenas com o advogado selecionado e com parceiros de pagamento, quando necessário."],
        ["Segurança", "Utilizamos criptografia em trânsito e em repouso, controle de acesso e monitoramento contínuo."],
        ["Seus direitos", "Você pode acessar, corrigir, portar ou solicitar a exclusão dos seus dados a qualquer momento pelo painel ou pelo e-mail de contato."],
        ["Contato do encarregado", "Dúvidas sobre privacidade podem ser enviadas para privacidade@consullex.com.br."],
      ]}
    />
  ),
});
