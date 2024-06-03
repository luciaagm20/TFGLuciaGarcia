import "./input.css";

const Input = ({label, value, type, placeholder, required, onChange}) => {  
    return (
      <div className="input">
        <label htmlFor={label}>{label}</label>
        <input type={type} id={label} name={label} value={value} placeholder={placeholder} required={required} onChange={onChange}/>
      </div>
    );
  };
  
  export default Input;
  