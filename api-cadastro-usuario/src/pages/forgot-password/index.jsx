import { useRef, useState } from "react";
import api from "../../services/api";
import styles from "./style.module.css";

export const ForgotPassword = () => {
  const [userExists, setUserExists] = useState(null);
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function verificarEmail() {
    const response = await api.post("/users/filterEmail", {
      email: inputEmail.current.value,
    });

    if (response.data) {
      setUserExists(response.data);
    } else {
      alert("Email não existe");
    }
  }

  async function mudarSenha() {
    const response = await api.put(`/users/forgot/${userExists.id}`, {
      password: inputPassword.current.value,
    });

    if (response.status === 200) {
      alert("Mudoou");
      window.location.href = "/";
    }
  }

  return (
    <div className={styles.geral}>
      <div className={styles.container}>
        <h1>Esqueceu a senha</h1>
        {userExists === null && (
          <input
            className="padrao-input"
            type="text"
            placeholder="Email"
            name="email"
            ref={inputEmail}
          />
        )}
        {userExists !== null && (
          <input
            className="padrao-input"
            type="text"
            placeholder="Senha"
            name="email"
            ref={inputPassword}
          />
        )}
        <button onClick={userExists === null ? verificarEmail : mudarSenha}>
          {!userExists ? "Verificar e-mail" : "Mudar a senha"}
        </button>
      </div>
    </div>
  );
};
