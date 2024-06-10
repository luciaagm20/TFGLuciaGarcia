import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/api/token/", { username, password })
      .then((response) => {
        console.log("Login exitoso:", response.data);
        const { access, client_id } = response.data;
        localStorage.setItem("token", access);
        localStorage.setItem("clientId", client_id); // Almacena el ID del cliente en el almacenamiento local
        setLoggedIn(true);

      axios
        .get(`http://localhost:8000/api/clients/${client_id}`, {
          headers: { Authorization: `Bearer ${access}` },
        })
        .then((res) => {
          const { is_superuser } = res.data;
          if (is_superuser) {
            navigate("/list_clients");
          } else {
            navigate("/client_page", { state: { clientId: client_id } });
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
