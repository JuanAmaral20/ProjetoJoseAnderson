import { Eye, EyeOff, X } from "lucide-react";
import { useRef, useState } from "react";
import api from "../services/api";

export function InputModal({ user, id }) {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const [isVisibleOne, setIsVisibleOne] = useState(false);

  function fecharModal() {
    let modal = document.getElementById("abrirModal");
    modal.style.display = "none";
  }

  async function updateUsers(ev) {
    await api.put(`/users/${user.id}`, {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    });
  }

  return (
    <div id={id} className="modal-geral">
      <form onSubmit={updateUsers} style={{ position: "relative" }}>
        <button
          className="fecharM"
          onClick={fecharModal}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <X />
        </button>
        <h1>Editar Usuário</h1>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          defaultValue={user.name}
          ref={inputName}
          className="padrao-input"
        />
        <input
          className="padrao-input"
          type="text"
          placeholder="Email"
          name="email"
          defaultValue={user.email}
          ref={inputEmail}
        />
        <div className="input-password">
          <input
            type={isVisibleOne ? "text" : "password"}
            placeholder="Senha"
            name="senha"
            defaultValue={user.password}
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
          Editar
        </button>
      </form>
    </div>
  );
}
