import Select from "react-select";

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
    <Select
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
