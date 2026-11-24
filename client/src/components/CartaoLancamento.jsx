import { formatarData, formatarValor } from "../utils/formatos";

function CartaoLancamento({
  lancamento,
  nomeConta,
  nomeCategoria,
  aoEditar,
  aoExcluir,
}) {
  const sinal = lancamento.tipo === "receita" ? "+" : "-";

  return (
    <article className={`cartao ${lancamento.tipo}`}>
      <h3>{lancamento.descricao}</h3>
      <p className="valor">
        {sinal} {formatarValor(lancamento.valorCentavos)}
      </p>
      <p>Tipo: {lancamento.tipo}</p>
      <p>Data: {formatarData(lancamento.data)}</p>
      <p>Categoria: {nomeCategoria}</p>
      <p>Conta: {nomeConta}</p>
      <div className="acoes">
        <button type="button" onClick={() => aoEditar(lancamento)}>
          Editar
        </button>
        <button type="button" onClick={() => aoExcluir(lancamento)}>
          Excluir
        </button>
      </div>
    </article>
  );
}

export default CartaoLancamento;
