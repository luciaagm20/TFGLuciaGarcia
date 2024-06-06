import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MenuPage from "./components/MenuPage/MenuPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ClientPage from "./components/ClientPage/ClientPage";
import ClientListPage from "./components/ClientListPage/ClientListPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import "./App.css";
import axios from "axios";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/menu/")
      .then((response) => {
        setWeeklyMenu(response.data); // Almacena los datos de los clientes en el estado
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/clients")
      .then((response) => {
        setClients(response.data); // Almacena los datos de los clientes en el estado
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRegistration = (userData) => {
    axios
      .post("http://localhost:8000/api/clients/", userData)
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        setClients((prevClients) => [...prevClients, response.data]);
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
      });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <LandingPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/home"
            element={
              <LandingPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/menu/:id"
            element={
              <MenuPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} weeklyMenu={weeklyMenu}/>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/client_page"
            element={
              <ClientPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} weeklyMenu={weeklyMenu} />
            }
          />
          <Route
            path="/list_clients"
            element={
              <ClientListPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} clients={clients}/>
            }
          />
          <Route
            path="/register"
            element={<RegistrationPage handleRegistration={handleRegistration} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
