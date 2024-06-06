import { useNavigate } from "react-router-dom";
import "./loginPage.css";


const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="loginPageContainer">
        <h2>Login</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required></input>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required></input>

        <button className="loginButton" onClick={() => navigate("/client_page")}>Login</button>      
    </div>
  );
};

export default LoginPage;