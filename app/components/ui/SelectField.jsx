import FormGroup from "./FormGroup";

const SelectField = ({ label, name, value, options, onChange }) => (
  <FormGroup label={label} name={name} value={value} onChange={onChange}>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </FormGroup>
);

export default SelectField