import { createBrowserRouter } from "react-router-dom";
import Scoreboard from "../projects/react/Scoreboard";
import PasswordGenerator from "../projects/react/PasswordGenerator";
import UnitConverter from "../projects/react/UnitConverter";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/scoreboard",
    element: <Scoreboard />
  },
  {
    path: "/password-generator",
    element: <PasswordGenerator />
  },
  {
    path: "/unit-converter",
    element: <UnitConverter />
  },
])


export default router;