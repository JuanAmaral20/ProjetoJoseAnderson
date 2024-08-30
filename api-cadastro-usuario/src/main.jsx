import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Cadastrar } from "./pages/cadastrar";
import "./index.css";
import { ForgotPassword } from "./pages/forgot-password";
import { Home } from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cadastrar",
    element: <Cadastrar />,
  },
  {
    path: "/esqueceu-a-senha",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
