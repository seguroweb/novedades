// components/ui/Button.js
import { clsx } from "clsx"

const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  danger: "bg-orange-600 hover:bg-orange-700 text-white",
  outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
}

export default function Button({ type = "button", variant = "primary", icon: Icon, children, className = "", ...props }) {
  return (
    <button
      type={type}
      className={clsx(
        "flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  )
}