import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartaoLancamento from "./CartaoLancamento";

const lancamento = {
  id: "1",
  descricao: "Almoço",
  valorCentavos: 2550,
  tipo: "despesa",
  data: "2026-11-24",
  contaId: "c1",
  categoriaId: "k1",
};

function mostrarCartao(extras = {}) {
  return render(
    <CartaoLancamento
      lancamento={lancamento}
      nomeConta="Carteira"
      nomeCategoria="Alimentação"
      aoEditar={() => {}}
      aoExcluir={() => {}}
      {...extras}
    />
  );
}

describe("CartaoLancamento", () => {
  it("mostra os campos do lançamento", () => {
    mostrarCartao();

    expect(screen.getByText("Almoço")).toBeInTheDocument();
    expect(screen.getByText(/25,50/)).toBeInTheDocument();
    expect(screen.getByText("Data: 24/11/2026")).toBeInTheDocument();
    expect(screen.getByText("Categoria: Alimentação")).toBeInTheDocument();
    expect(screen.getByText("Conta: Carteira")).toBeInTheDocument();
  });

  it("chama aoEditar com o lançamento ao clicar em Editar", () => {
    const aoEditar = vi.fn();
    mostrarCartao({ aoEditar });

    fireEvent.click(screen.getByText("Editar"));

    expect(aoEditar).toHaveBeenCalledWith(lancamento);
  });
});
