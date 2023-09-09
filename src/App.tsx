import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container flex flex-col">
      <Link to="/scoreboard" className="text-center border">Scoreboard</Link>
      <Link to="/password-generator" className="text-center border">Password Generator</Link>
    </div>
  )
}

export default App
