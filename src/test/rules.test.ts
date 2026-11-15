import { describe, expect, it } from "vitest";

import { applyCoupon } from "@/lib/booking";
import { isProfessionalEmail, isValidCNPJ, isValidCPF } from "@/lib/validators";

describe("Cadastro: validação de documentos", () => {
  it("aceita CNPJ válido e recusa dígito verificador errado", () => {
    expect(isValidCNPJ("11.222.333/0001-81")).toBe(true);
    expect(isValidCNPJ("11.222.333/0001-82")).toBe(false);
    expect(isValidCNPJ("11.111.111/1111-11")).toBe(false);
  });

  it("aceita CPF válido e recusa sequência repetida", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
    expect(isValidCPF("529.982.247-24")).toBe(false);
    expect(isValidCPF("111.111.111-11")).toBe(false);
  });

  it("e-mail profissional recusa provedores gratuitos", () => {
    expect(isProfessionalEmail("ana@nexuscorp.com.br")).toBe(true);
    expect(isProfessionalEmail("ana@gmail.com")).toBe(false);
  });
});

describe("Pagamento: cupom de desconto", () => {
  it("BEMVINDO10 dá 10% de desconto", () => {
    expect(applyCoupon(350, "bemvindo10")).toEqual({ valid: true, discount: 35, total: 315 });
  });
  it("cupom inexistente mantém o valor", () => {
    expect(applyCoupon(350, "XYZ")).toEqual({ valid: false, discount: 0, total: 350 });
  });
});
