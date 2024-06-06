import "./menuCard.css";
import { useNavigate } from "react-router-dom";

const MenuCard = ({id, initialDate, finalDate}) => {  
    const navigate = useNavigate();
    return (
      <div className="menuCard" onClick={() => navigate(`/menu/${id}`)}>
        <header>{`${initialDate} / ${finalDate}`}</header>
      </div>

    );
  };
  
  export default MenuCard;