import { useNavigate, generatePath } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginPage from "../LoginPage/LoginPage";

const Navbar = ({
  isLoggedIn,
  setLoggedIn,
  setSignUpModalOpen,
  signUpModalOpen,
  requestModalOpen,
  setRequestModalOpen,
  isAdminUser,
  setAdminUser,
  clientId,
}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  console.log(clientId)

  return (
    <nav className="navbar">
      {isAdminUser && (
        <div className="adminButtons">
          <button onClick={() => navigate("/list_clients")}>
            List Clients
          </button>
          <button onClick={() => navigate("/list_food")}>List Food</button>
          <button onClick={() => navigate("/list_requests")}>Requests</button>
        </div>
      )}
      <div className="regularButtons">
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setLoginModalOpen(!loginModalOpen);
            } else {
                setLoggedIn(false);
                setAdminUser(false);
                localStorage.clear();
                navigate("/");
            }
          }}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
        {isLoggedIn && !isAdminUser && (
          <>
            <button
              onClick={() => {
                const path = generatePath("/profile/:clientId", {
                  clientId,
                });
                navigate(path);
              }}
            >
              Profile
            </button>
            <button
              onClick={() => {
                const path = generatePath("/client_page/:clientId", {
                  clientId: clientId,
                });
                navigate(path);
              }}
            >
              Menu Page
            </button>
            <button onClick={() => setRequestModalOpen(!requestModalOpen)}>
              Add request
            </button>
            <button onClick={() => navigate("/list_food")}>List Food</button>
          </>
        )}
        {!isLoggedIn && (
          <button onClick={() => setSignUpModalOpen(!signUpModalOpen)}>
            Sign up
          </button>
        )}
      </div>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <LoginPage setLoggedIn={setLoggedIn} setAdminUser={setAdminUser} />
      </Modal>
    </nav>
  );
};

export default Navbar;
