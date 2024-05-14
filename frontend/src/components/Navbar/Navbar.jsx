import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isLoggedIn, setLoggedIn, setSignUpModalOpen, signUpModalOpen }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    // TODO: handle authentication when finished in backend
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/menus");
    }
    setLoggedIn(!isLoggedIn);
  };

  return (
    <div className={"navbarContainer"}>
      <div className={"adminButtons"}>
        {/* TODO: Add admin buttons: users, foods, suggestions */}
      </div>
      <div className={"regularButtons"}>
        <button onClick={handleLoginClick}>
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
        {!isLoggedIn && (
          <button onClick={() => setSignUpModalOpen(!signUpModalOpen)}>
            Sign up
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
