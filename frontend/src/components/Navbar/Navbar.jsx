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
  // const [requestModalOpen, setRequestModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={"navbarContainer"}>
      {isAdminUser && (
        <div className={"adminButtons"}>
          <button onClick={() => navigate("/list_clients")}>
            List Clients
          </button>
          <button onClick={() => navigate("/list_food")}>List Food</button>
          <button onClick={() => navigate("/list_requests")}>Requests</button>
        </div>
      )}
      <div className={"regularButtons"}>
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setLoginModalOpen(!loginModalOpen);
            } else {
              setLoggedIn(!isLoggedIn);
              setAdminUser(!isAdminUser);
              localStorage.clear();
              navigate("/");
            }
          }}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
        {isLoggedIn ? (
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
          <button onClick={() => setRequestModalOpen(!requestModalOpen)}>
            Add request
          </button>
          <button onClick={() => navigate("/list_food")}>List Food</button>
        </>
        ) : (
          <button onClick={() => setSignUpModalOpen(!signUpModalOpen)}>
            Sign up
          </button>
        )}
      </div>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <LoginPage setLoggedIn={setLoggedIn} setAdminUser={setAdminUser} />
      </Modal>
    </div>
  );
};

export default Navbar;
