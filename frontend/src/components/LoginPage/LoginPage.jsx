import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";

const LoginPage = ({ setLoggedIn, setAdminUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

        if (clientId) setLoggedIn(true);
        axios
          .get(`http://localhost:8000/api/clients/${client_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const { is_superuser } = res.data;
            if (is_superuser) setAdminUser(true);

            if (is_superuser) {
              navigate("/list_clients");
            } else {
              const path = generatePath("/client_page/:clientId", { clientId: client_id})
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
        alert("Usuario o contraseña incorrectos");
      });
  };

  return (
    <div className="loginPageContainer">
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="loginButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
