import "./menuCard.css";
import { useNavigate } from "react-router-dom";

const MenuCard = ({id, initialDate, finalDate}) => {  
    const navigate = useNavigate();
    return (
        <div className="menuCard" onClick={() => navigate(`/menu/${id}`)}>
          <div/>
          <div className="dateContainer">
            <header>{`${initialDate}`}</header>
            <header>{`${finalDate}`}</header>
        </div>
      </div>

    );
  };
  
  export default MenuCard;
