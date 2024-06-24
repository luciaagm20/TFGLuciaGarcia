import "./menuCard.css";
import { useNavigate } from "react-router-dom";

const MenuCard = ({id, initialDate, finalDate}) => {  
    const navigate = useNavigate();
    return (
      <div className="menuContainer">
        <div className="menuCard" onClick={() => navigate(`/menu/${id}`)}>
          <div className="dateContainer">
            <header>{`${initialDate}`}</header>
            <header>{`${finalDate}`}</header>
          </div>
        </div>
      </div>

    );
  };
  
  export default MenuCard;
