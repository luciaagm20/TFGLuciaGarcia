import Select from "react-select";
import "./dropdown.css";

const Dropdown = ({
  options,
  onChange,
  value,
  label,
  multipleSelect,
  placeholder,
  className,
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
      className={className}
      {...props}
    />
    </div>
    
  );
};

export default Dropdown;
