import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormLancamento from "./FormLancamento";

const contas = [{ id: "c1", nome: "Carteira" }];
const categorias = [
  { id: "k1", nome: "Alimentação", tipo: "despesa" },
  { id: "k2", nome: "Salário", tipo: "receita" },
];

function mostrarForm(aoSalvar) {
  return render(
    <FormLancamento
      contas={contas}
      categorias={categorias}
      editando={null}
      aoSalvar={aoSalvar}
      aoCancelar={() => {}}
    />
  );
}

describe("FormLancamento", () => {
  it("mostra mensagem de validação ao enviar vazio, sem chamar a API", () => {
    const aoSalvar = vi.fn();
    mostrarForm(aoSalvar);

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(screen.getByText("Informe a descrição.")).toBeInTheDocument();
    expect(aoSalvar).not.toHaveBeenCalled();
  });

  it("envia os dados em centavos quando o formulário está certo", async () => {
    const aoSalvar = vi.fn();
    mostrarForm(aoSalvar);

    fireEvent.change(screen.getByLabelText(/Descrição/), {
      target: { value: "Almoço" },
    });
    fireEvent.change(screen.getByLabelText(/Valor/), {
      target: { value: "25,50" },
    });
    fireEvent.change(screen.getByLabelText(/Categoria/), {
      target: { value: "k1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => expect(aoSalvar).toHaveBeenCalledTimes(1));
    expect(aoSalvar).toHaveBeenCalledWith(
      expect.objectContaining({
        descricao: "Almoço",
        valorCentavos: 2550,
        tipo: "despesa",
        contaId: "c1",
        categoriaId: "k1",
      })
    );
  });
});
