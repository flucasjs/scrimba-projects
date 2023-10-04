import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container flex flex-col text-center ">
      <Link to="/scoreboard" className="border">Scoreboard</Link>
      <Link to="/password-generator" className="border">Password Generator</Link>
      <Link to="/unit-converter" className="border">Unit Converter</Link>
    </div>
  )
}

export default App
