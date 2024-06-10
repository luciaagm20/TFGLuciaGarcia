import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import LoginPage from "../LoginPage/LoginPage";
import logo from "../../images/logo.png";
import "./landingPage.css";

const LandingPage = ({ isLoggedIn, setLoggedIn }) => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landingPageContainer">
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        signUpModalOpen={signUpModalOpen}
        setSignUpModalOpen={setSignUpModalOpen}
      />
      <img src={logo} alt="logo" />
      <button
        onClick={() => {
          setLoginModalOpen(!loginModalOpen);
        }}
      >
        Login
      </button>
      <button onClick={() => navigate("/list_clients")}>List users</button>
      <p className="subtitle">
        We create healthy weekly menus exclusively for you based on your
        preferences and needs.
      </p>
      <Modal isOpen={signUpModalOpen} onClose={() => setSignUpModalOpen(false)}>
        <RegistrationPage />
      </Modal>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <LoginPage />
      </Modal>
    </div>
  );
};

export default LandingPage;
