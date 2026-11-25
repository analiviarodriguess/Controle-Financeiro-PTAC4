# Controle Financeiro

**Tema do app:** Controle Financeiro. O app gerencia **lançamentos** (receitas e despesas) e usa o recurso `/lancamentos` da API Express do PTAS3, que está neste mesmo repositório, na pasta `server/`.

## Opção de API usada

**Opção A:** API Express própria (pasta `server/`).

- **Base URL:** `/api/v1`. Em desenvolvimento o Vite redireciona `/api` para `http://localhost:3000`, então o navegador não tem problema de CORS. A API também libera CORS para `http://localhost:5173`.
- **Listas** respondem no formato `{ data, meta }`. **Erros** respondem `{ type, message }`.
- **Autenticação:** login em `POST /usuarios/login` devolve um token. As demais rotas exigem `Authorization: Bearer <token>`.

### Campos de um lançamento

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | texto (UUID) | gerado pela API |
| `descricao` | texto | obrigatório |
| `valorCentavos` | inteiro | maior que zero. Ex.: `2550` = R$ 25,50 |
| `tipo` | texto | `"receita"` ou `"despesa"` |
| `data` | texto | formato `AAAA-MM-DD` |
| `contaId` | texto (UUID) | conta do usuário |
| `categoriaId` | texto (UUID) | categoria do mesmo tipo do lançamento |
| `usuarioId` | texto (UUID) | definido pela API a partir do token |

O app mostra e recebe o valor em reais (`25,50`) e converte para centavos antes de enviar.

### Rotas usadas pelo app

| Método | Rota | Função |
|---|---|---|
| POST | `/usuarios` | Cadastrar usuário |
| POST | `/usuarios/login` | Login (devolve o token) |
| GET / POST | `/contas` | Listar / criar contas |
| GET / POST | `/categorias` | Listar / criar categorias |
| GET | `/lancamentos` | Listar lançamentos |
| POST | `/lancamentos` | Cadastrar lançamento |
| PUT | `/lancamentos/:id` | Editar lançamento |
| DELETE | `/lancamentos/:id` | Excluir lançamento |

A API também tem relatórios (`/relatorios/saldo/:contaId`, `/extrato`, `/categorias`, `/mensal`), que o app ainda não usa.

## Como rodar

São necessários dois terminais.

**1. API** (porta 3000):

    cd server
    npm install
    npm start

**2. Cliente** (porta 5173):

    cd client
    npm install
    npm run dev

Abra `http://localhost:5173`.

**Atenção:** a API guarda os dados **em memória**. Ao reiniciá-la, usuários, contas e lançamentos são apagados. Depois de reiniciar, crie o usuário de novo e use o botão **"Criar conta e categorias padrão"** para começar.

## Como rodar os testes

    cd client
    npm test

- Funções puras (Vitest): `src/utils/formatos.test.js` e `src/utils/lancamentos.test.js`.
- Componentes (Testing Library): `CartaoLancamento`, `FormLancamento` e `BuscaLancamentos`.

Teste automático da API (com a API ligada): `cd server && node teste.js`.

## Estrutura

    client/src/
      api.js                  único arquivo que usa fetch
      App.jsx                 login ou painel
      components/             Login, Painel, FormLancamento, CartaoLancamento,
                              ListaLancamentos, BuscaLancamentos
      utils/                  funções puras (formatos, validação, busca)
    server/
      server.js, routes/, middlewares/, dados/, utils/

## NoSQL vs SQL

Exemplo de documento devolvido pela API em `POST /lancamentos`:

```json
{
  "id": "3f1c2b8e-5a47-4d0e-9b6a-8c2d1e7f4a90",
  "usuarioId": "b7d9e0a4-2c61-4f3b-8a15-6e9c0d3f7b21",
  "descricao": "Almoço",
  "valorCentavos": 2550,
  "tipo": "despesa",
  "data": "2026-11-24",
  "contaId": "9a4e6c2d-1b83-4e75-a0f9-5d7c3b1e8a62",
  "categoriaId": "c5f8a1d3-7e29-4b64-9d0a-2f6b8e4c1a73"
}
```

No MongoDB (NoSQL), os dados são guardados como **documentos**: objetos parecidos com JSON, como o de cima, que podem ter campos diferentes de um documento para outro. Os documentos ficam agrupados em **coleções**. A coleção `lancamentos` seria o equivalente a uma tabela do SQL, mas sem colunas fixas, e cada documento seria o equivalente a uma linha. Neste projeto a API ainda guarda os dados em listas na memória (sem banco), mas cada item tem o formato de documento e cada lista funciona como uma coleção.

Sobre os ids: no MongoDB o `_id` é um **ObjectId**, um texto de 24 caracteres hexadecimais (como `672a1f9c8e4b3d2a1c0b9e77`) gerado pelo banco. No SQL e no JSONPlaceholder o `id` costuma ser um **número** que cresce de 1 em 1 (1, 2, 3...). Esta API usa **UUID** (texto de 36 caracteres, gerado por `crypto.randomUUID()`): como o ObjectId, é um texto único e difícil de adivinhar, e não é sequencial como o número do SQL. Por isso o front-end sempre trata o `id` como **texto**.
