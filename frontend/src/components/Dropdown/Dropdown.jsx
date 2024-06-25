import Select from "react-select";
import "./dropdown.css";

const Dropdown = ({
  options,
  onChange,
  value,
  label,
  multipleSelect,
  placeholder,
  ...props
}) => {
  return (
    <div className="select">
      <label htmlFor={label}>{label}</label>
      <Select 
      isMulti={multipleSelect}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
    </div>
    
  );
};

export default Dropdown;
