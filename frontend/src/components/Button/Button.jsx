import "./button.css";

const Button = ({value, onClick, disabled}) => {  
    return (
      <div>
        <button className="button" onClick={onClick} disabled={disabled}> {value} </button>
      </div>
    );
  };
  
  export default Button;
  