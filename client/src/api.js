const baseUrl = "https://curly-halibut-g4wwxvgp5xrq2pgv5-3000.app.github.dev";

let token = null;

export function setToken(novoToken) {
  token = novoToken;
}

async function requisicao(caminho, opcoes = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${baseUrl}${caminho}`, { ...opcoes, headers });

  if (!response.ok) {
    const mensagens = {
      400: "Dados inválidos",
      401: "Sessão expirada ou login inválido",
      404: "Item não encontrado",
      409: "Registro já cadastrado",
    };
    let mensagem = mensagens[response.status] || `Erro ${response.status}`;
    try {
      const erro = await response.json();
      mensagem = erro.erro || erro.message || mensagem;
    } catch {
      // resposta sem corpo
    }
    throw new Error(mensagem);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function apiLogin(email, senha) {
  return requisicao("/usuarios/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export function apiGet(caminho, signal) {
  return requisicao(caminho, { signal });
}

export function apiPost(caminho, dados) {
  return requisicao(caminho, { method: "POST", body: JSON.stringify(dados) });
}

export function apiPut(caminho, dados) {
  return requisicao(caminho, { method: "PUT", body: JSON.stringify(dados) });
}

export function apiDelete(caminho) {
  return requisicao(caminho, { method: "DELETE" });
}