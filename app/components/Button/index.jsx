
const Button = ({ children }) => {
  return (
    <button
        type="button"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
    >
       {children}
    </button>
  )
}

export default Button