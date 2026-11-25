import { describe, it, expect } from "vitest";
import {
  reaisParaCentavos,
  centavosParaReais,
  formatarValor,
  formatarData,
} from "./formatos";

describe("reaisParaCentavos", () => {
  it("converte valores com vírgula, ponto ou sem decimais", () => {
    expect(reaisParaCentavos("25,50")).toBe(2550);
    expect(reaisParaCentavos("19.99")).toBe(1999);
    expect(reaisParaCentavos("25")).toBe(2500);
    expect(reaisParaCentavos("0,05")).toBe(5);
  });

  it("lança erro quando o texto não é um valor válido", () => {
    expect(() => reaisParaCentavos("abc")).toThrow("valor válido");
    expect(() => reaisParaCentavos("")).toThrow();
    expect(() => reaisParaCentavos("-5")).toThrow();
  });
});

describe("centavosParaReais", () => {
  it("converte centavos para o texto do campo", () => {
    expect(centavosParaReais(2550)).toBe("25,50");
    expect(centavosParaReais(5)).toBe("0,05");
  });
});

describe("formatarValor", () => {
  it("formata em reais", () => {
    expect(formatarValor(2550).replace(/\s/g, " ")).toBe("R$ 25,50");
  });
});

describe("formatarData", () => {
  it("troca AAAA-MM-DD por DD/MM/AAAA", () => {
    expect(formatarData("2026-11-24")).toBe("24/11/2026");
  });
});
