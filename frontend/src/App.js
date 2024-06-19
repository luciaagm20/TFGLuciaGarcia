import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MenuPage from "./components/MenuPage/MenuPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ClientPage from "./components/ClientPage/ClientPage";
import ClientListPage from "./components/ClientListPage/ClientListPage";
import FoodListPage from "./components/FoodListPage/FoodListPage";
import FoodInfoPage from "./components/FoodInfoPage/FoodInfoPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import "./App.css";
import axios from "axios";
import LoginPage from "./components/LoginPage/LoginPage";
import AddFoodPage from "./components/AddFoodPage/AddFoodPage";
import RequestListPage from "./components/RequestListPage/RequestListPage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdminUser, setAdminUser] = useState(false);

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
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/list_food"
            element={
              <FoodListPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
                isAdminUser={isAdminUser}
                setAdminUser={setAdminUser}
              />
            }
          />
          <Route
            path="/info_food/:foodId"
            element={
              <FoodInfoPage
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
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
            path="/register_food"
            element={
              <AddFoodPage  />
            }
          />
          <Route
            path="//list_requests"
            element={
              <RequestListPage  />
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
