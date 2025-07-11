import { Calendar } from "lucide-react"
import FormGroup from "./FormGroup"

const DateField = ({ label, name, value, onChange }) => (
  <FormGroup label={label} name={name} value={value} onChange={onChange}>
    <div className="relative">
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  </FormGroup>
)

export default DateField