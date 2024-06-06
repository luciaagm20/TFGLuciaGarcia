import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MenuPage from "./components/MenuPage/MenuPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ClientPage from "./components/ClientPage/ClientPage";
import "./App.css";
import axios from "axios";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState([]);

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

  console.log(weeklyMenu)

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
            path="/menu"
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
              <ClientPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
