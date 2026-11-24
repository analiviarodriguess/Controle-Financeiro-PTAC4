// Padrão de erro pedido pelo professor: { type, message }
function enviarErro(res, status, type, message) {
  return res.status(status).json({ type, message });
}

module.exports = { enviarErro };