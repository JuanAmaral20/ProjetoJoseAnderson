import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../forgot-password";

export const Login = () => {
  const [isVisibleOne, setIsVisibleOne] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    const response = await api.post("/session", {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    });

    if (response.data) {
      navigate("/home");
    } else {
      alert("Error ");
    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={login}>
          <h1>Login</h1>
          <input
            className="padrao-input"
            type="text"
            placeholder="Email"
            name="email"
            ref={inputEmail}
          />
          <div className="input-password">
            <input
              type={isVisibleOne ? "text" : "password"}
              placeholder="Senha"
              name="senha"
              ref={inputPassword}
            />
            <button
              className="padrao-btn"
              onClick={(ev) => {
                ev.preventDefault();
                setIsVisibleOne((state) => !state);
              }}
            >
              {isVisibleOne ? <Eye color="green" /> : <EyeOff />}
            </button>
          </div>
          <button type="submit" className="btn-cadastrar">
            Entrar
          </button>
          <a href="/esqueceu-a-senha">Esqueceu a senha?</a>
          <a href="/cadastrar">Ainda n possui uma conta? Registre-se</a>
        </form>

        {forgotPassword && <ForgotPassword />}

        {/* {users.map((user) => (
          <Card
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUserSelected={setUserSelected}
          />
        ))} */}
      </div>
    </>
  );
};
