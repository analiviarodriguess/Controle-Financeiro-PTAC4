import { describe, it, expect } from "vitest";
import { validarLancamento, filtrarLancamentos } from "./lancamentos";

const dadosValidos = {
  descricao: "  Almoço  ",
  valor: "25,50",
  tipo: "despesa",
  data: "2026-11-24",
  contaId: "conta-1",
  categoriaId: "cat-1",
};

describe("validarLancamento", () => {
  it("devolve os dados prontos para a API (valor em centavos)", () => {
    expect(validarLancamento(dadosValidos)).toEqual({
      descricao: "Almoço",
      valorCentavos: 2550,
      tipo: "despesa",
      data: "2026-11-24",
      contaId: "conta-1",
      categoriaId: "cat-1",
    });
  });

  it("lança erro quando a descrição está vazia", () => {
    expect(() =>
      validarLancamento({ ...dadosValidos, descricao: "   " })
    ).toThrow("Informe a descrição.");
  });

  it("lança erro quando o valor é zero ou inválido", () => {
    expect(() => validarLancamento({ ...dadosValidos, valor: "0" })).toThrow(
      "maior que zero"
    );
    expect(() => validarLancamento({ ...dadosValidos, valor: "abc" })).toThrow(
      "valor válido"
    );
  });

  it("lança erro quando falta conta ou categoria", () => {
    expect(() =>
      validarLancamento({ ...dadosValidos, contaId: "" })
    ).toThrow("conta");
    expect(() =>
      validarLancamento({ ...dadosValidos, categoriaId: "" })
    ).toThrow("categoria");
  });
});

describe("filtrarLancamentos", () => {
  const lista = [
    { id: 1, descricao: "Almoço" },
    { id: 2, descricao: "Salário" },
    { id: 3, descricao: "Jantar com almoço de domingo" },
  ];

  it("filtra pela descrição sem diferenciar maiúsculas", () => {
    expect(filtrarLancamentos(lista, "ALMO")).toHaveLength(2);
  });

  it("devolve a lista inteira quando a busca está vazia", () => {
    expect(filtrarLancamentos(lista, "")).toHaveLength(3);
    expect(filtrarLancamentos(lista, "   ")).toHaveLength(3);
  });

  it("devolve lista vazia quando nada combina", () => {
    expect(filtrarLancamentos(lista, "xyz")).toEqual([]);
  });
});
