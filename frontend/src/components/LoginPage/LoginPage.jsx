import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";
import Button from "../Button/Button";
import ErrorMessagePage from "../ErrorMessage/ErrorMessagePage";

const LoginPage = ({ setLoggedIn, setAdminUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    let clientId = null;
    let token = null;

    axios
      .post("http://localhost:8000/api/token/", { username, password })
      .then((response) => {
        const { access, client_id } = response.data;
        clientId = client_id;
        token = access;
        localStorage.setItem("token", access);
        localStorage.setItem("clientId", client_id);

        if (clientId) setLoggedIn(true);

        axios
          .get(`http://localhost:8000/api/clients/${client_id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const { is_superuser } = res.data;
            if (is_superuser) {
              localStorage.setItem("is_admin", true);
              setAdminUser(true);
            } else {
              setAdminUser(false);
            }

            if (is_superuser) {
              navigate("/list_clients");
            } else {
              const path = generatePath("/client_page/:clientId", {
                clientId: client_id,
              });
              navigate(path);
            }
          })
          .catch((error) => {
            console.error("Error al obtener los detalles del usuario:", error);
            alert("Error al obtener los detalles del usuario");
          });
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        setErrorModalOpen(true);
      });
  };

  return (
    <>
      {errorModalOpen && (
        <ErrorMessagePage
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          message={"Incorrect user or password"}
        />
      )}
      <div className="loginPageContainer">
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button value="Login" onClick={handleLogin} disabled={false} />
      </div>
    </>
  );
};

export default LoginPage;
