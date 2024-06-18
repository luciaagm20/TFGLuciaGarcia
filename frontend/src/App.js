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
import LoginPage from "./components/LoginPage/LoginPage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "http://localhost:8000",
// });

// // Configurar interceptor de axios para incluir el token en cada solicitud
// client.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdminUser, setAdminUser] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  // const [weeklyMenuId, setWeeklyMenuId] = useState([]);
  const [clients, setClients] = useState([]);
  // const [client, setClient] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/menu")
  //     .then((response) => {
  //       setWeeklyMenu(response.data); // Almacena los datos de los clientes en el estado
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);


  // useEffect(() => {
  //   if (clientId) {
  //     axios
  //       .get(`http://localhost:8000/api/menu/${clientId}`)
  //       .then((response) => {
  //         setWeeklyMenuId(response.data); // Almacena los datos de los menús en el estado
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [clientId]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/clients")
  //     .then((response) => {
  //       setClients(response.data); // Almacena los datos de los clientes en el estado
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/clients/${clientId}")
  //     .then((response) => {
  //       setClient(response.data); // Almacena los datos del cliente en el estado
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const handleRegistration = (userData) => {
  //   axios
  //     .post("http://localhost:8000/api/clients", userData)
  //     .then((response) => {
  //       console.log("Registro exitoso:", response.data);
  //       setClients((prevClients) => [...prevClients, response.data]);
  //     })
  //     .catch((error) => {
  //       console.error("Error al registrar:", error);
  //     });
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setAdminUser={setAdminUser}
                isAdminUser={isAdminUser}
              />
            }
          />
          <Route
            path="/home"
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                setAdminUser={setAdminUser}
                isAdminUser={isAdminUser}
              />
            }
          />
          <Route
            path="/menu/:id"
            element={
              <MenuPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/profile/:clientId"
            element={
              <ProfilePage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/client_page/:clientId"
            element={
              <ClientPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/list_clients"
            element={
              <ClientListPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                clients={clients}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPage  />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                setLoggedIn={setLoggedIn}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />

          <Route
            path="/request"
            element={
              <RegistrationPage />
            }
          />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
