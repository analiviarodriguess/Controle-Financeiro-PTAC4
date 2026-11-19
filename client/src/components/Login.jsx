import { useState } from "react";
import { apiLogin, apiPost, setToken } from "../api";

function Login({ aoEntrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");

    if (email.trim() === "" || senha === "" || (modoCadastro && nome.trim() === "")) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      if (modoCadastro) {
        await apiPost("/usuarios", { nome, email, senha });
      }
      const resposta = await apiLogin(email, senha);
      setToken(resposta.token);
      aoEntrar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main style={{ maxWidth: 360, margin: "40px auto", padding: 16 }}>
      <h1>Controle Financeiro</h1>
      <h2>{modoCadastro ? "Criar conta" : "Entrar"}</h2>

      <form onSubmit={enviar}>
        {modoCadastro && (
          <p>
            <label>
              Nome<br />
              <input value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
          </p>
        )}

        <p>
          <label>
            Email<br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </p>

        <p>
          <label>
            Senha<br />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
        </p>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Aguarde..." : modoCadastro ? "Criar conta e entrar" : "Entrar"}
        </button>
      </form>

      <p>
        <button type="button" onClick={() => setModoCadastro(!modoCadastro)}>
          {modoCadastro ? "Já tenho conta" : "Quero criar uma conta"}
        </button>
      </p>
    </main>
  );
}

export default Login;