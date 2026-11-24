function BuscaLancamentos({ valor, aoMudar }) {
  return (
    <p className="busca">
      <label>
        Buscar por descrição<br />
        <input
          type="search"
          value={valor}
          onChange={(e) => aoMudar(e.target.value)}
          placeholder="Ex.: almoço"
        />
      </label>
    </p>
  );
}

export default BuscaLancamentos;
