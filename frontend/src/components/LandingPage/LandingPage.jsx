import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import logo from "../../images/logo.png";
import "./landingPage.css";

const LandingPage = ({ isLoggedIn, setLoggedIn, setAdminUser, isAdminUser }) => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <div className="landingPageContainer">
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        signUpModalOpen={signUpModalOpen}
        setSignUpModalOpen={setSignUpModalOpen}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
      />
      <img src={logo} alt="logo" />
      <p className="subtitle">
        We create healthy weekly menus exclusively for you based on your
        preferences and needs.
      </p>
      <Modal isOpen={signUpModalOpen} onClose={() => setSignUpModalOpen(false)}>
        <RegistrationPage />
      </Modal>
    </div>
  );
};

export default LandingPage;
