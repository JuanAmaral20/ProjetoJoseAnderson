import {
  ChevronLeftCircle,
  ChevronRightCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/card";
import { InputModal } from "../../components/modal";
import api from "../../services/api";
import styles from "./style.module.css";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const [isVisibleOne, setIsVisibleOne] = useState(false);
  const [quantityPage, setQuantityPage] = useState(1);
  const [userSelected, setUserSelected] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [page, setPage] = useState(1);

  async function getUsers() {
    const usersFromApi = await api.get(`/users?page=${page}`);
    setUsers(usersFromApi.data.users);
    setQuantityPage(usersFromApi.data.quantityPage);
  }

  function previousPage() {
    if (page > 1) {
      setPage((state) => state - 1);
    }
  }

  function nextPage() {
    if (page < quantityPage) {
      setPage((state) => state + 1);
    }
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
    <div className={styles.geral}>
      <div className={styles.formCreate}>
        <form action="">
          <h1>Adicionar usuário</h1>
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
            Adicionar
          </button>
        </form>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.pageContainer}>
          <ChevronLeftCircle onClick={previousPage} size={32} />

          <div className={styles.livroContainer}>
            {users.map((user) => (
              <Card
                key={user.id}
                user={user}
                deleteUsers={deleteUsers}
                setUserSelected={setUserSelected}
              />
            ))}
          </div>

          <ChevronRightCircle onClick={nextPage} size={32} />
        </div>

        <InputModal id="abrirModal" user={userSelected} />
      </div>
    </div>
  );
};
