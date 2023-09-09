import { createBrowserRouter } from "react-router-dom";
import Scoreboard from "../projects/react/Scoreboard";
import PasswordGenerator from "../projects/react/PasswordGenerator";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/password-generator",
    element: <PasswordGenerator />
  },
  {
    path: "/scoreboard",
    element: <Scoreboard />
  }
])


export default router;