import { BookUser, Eye, EyeOff, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Card({ user, deleteUsers, setUserSelected }) {
  const [isVisible, setIsVisible] = useState(false);
  const [userDetails, setUserSelectedDetails] = useState(null);

  function abrirModal() {
    let modal = document.getElementById("abrirModal");
    modal.style.display = "flex";
  }

  return (
    <div>
      <div key={user.id} className="card">
        <div className="input-cadastro">
          <p>
            Nome: <span>{user.name}</span>{" "}
          </p>
          <p>
            Email: <span>{user.email}</span>{" "}
          </p>
          <p>
            Senha:{" "}
            {isVisible ? <span>{user.password}</span> : <span>*******</span>}
          </p>
        </div>
        <div className="img-btn">
          <button onClick={() => deleteUsers(user.id)}>
            <Trash2 className="trash" />
          </button>
          <button
            onClick={() => {
              setUserSelected(user);
              abrirModal();
            }}
          >
            <FilePenLine className="edit" />
          </button>
          <button
            onClick={() => {
              if (userDetails !== null) {
                setUserSelectedDetails(null);
              } else {
                setUserSelectedDetails(user);
              }
            }}
          >
            <BookUser className="edit" />
          </button>

          <button
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          >
            {isVisible ? <Eye color="green" /> : <EyeOff />}
          </button>
        </div>
      </div>

      {userDetails && (
        <div className="card-details">
          <p>Nome: {user.name}</p>
          <p>E-mail: {user.email}</p>
          <p>Senha: {user.password}</p>
          <p>
            Data cadastro:{" "}
            {format(user.createdAt, "P", {
              locale: ptBR,
            })}
          </p>
        </div>
      )}
    </div>
  );
}
