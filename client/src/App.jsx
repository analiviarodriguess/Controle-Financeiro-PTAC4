import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <Login aoEntrar={() => setLogado(true)} />;
  }

  return (
    <div>
      <h1>Controle Financeiro</h1>
      <p>Você está logada! 🎉</p>
    </div>
  );
}

export default App;