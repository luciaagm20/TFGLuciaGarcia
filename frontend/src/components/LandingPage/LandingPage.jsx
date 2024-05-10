import logo from "../../images/logo.png";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPageContainer">
      <img src={logo} alt="logo" />
      {/* TODO: Add login component when BE ready */}
      <a href="">Sing in</a>
      <p className="subtitle">
        We create healthy weekly menus exclusively for you based on your
        preferences and needs.
      </p>
      
    </div>
  );
};

export default LandingPage;
