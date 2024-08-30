import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from "../../services/api";
import { Eye, EyeOff } from "lucide-react";
import { Card } from "../../components/card";
import { InputModal } from "../../components/modal";
import { useNavigate } from "react-router-dom";

export function Cadastrar() {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleOne, setIsVisibleOne] = useState(false);
  const [userSelected, setUserSelected] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  // async function getUsers() {
  //   const usersFromApi = await api.get("/users?page=1", {});
  //   setUsers(usersFromApi.data.users);
  // }

  async function createUsers() {
    try {
      const response = await api.post("/users", {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      alert("Erro no servidor");
    }
  }

  // async function deleteUsers(id) {
  //   await api.delete(`/users/${id}`);
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <>
      <div className="container">
        <form action="">
          <h1>Cadastro de Usuários</h1>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            ref={inputName}
            className="padrao-input"
          />
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
              type="button"
              onClick={(ev) => {
                ev.preventDefault();
                setIsVisibleOne((state) => !state);
              }}
            >
              {isVisibleOne ? <Eye color="green" /> : <EyeOff />}
            </button>
          </div>
          <button type="button" onClick={createUsers} className="btn-cadastrar">
            Cadastrar
          </button>

          <a href="/">Já possui uma conta? Acesse</a>
        </form>

        {/* {users.map((user) => (
          <Card
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUserSelected={setUserSelected}
          />
        ))} */}
      </div>
      {/* <InputModal id="abrirModal" user={userSelected} /> */}
    </>
  );
}
