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
    <Select className="select"
      isMulti={multipleSelect}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      label={label}
      {...props}
    />
  );
};

export default Dropdown;
