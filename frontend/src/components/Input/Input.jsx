import "./input.css";

const Input = ({label, value, type, placeholder, required, onChange, className}) => {  
    return (
      <div className="input">
        <label htmlFor={label}>{label}</label>
        <input type={type} id={label} name={label} value={value} placeholder={placeholder} required={required} onChange={onChange} className={className}/>
      </div>
    );
  };
  
  export default Input;
  