import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MenuPage from "./components/MenuPage/MenuPage";
import './App.css'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

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
            path="/menus"
            element={
              <MenuPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
