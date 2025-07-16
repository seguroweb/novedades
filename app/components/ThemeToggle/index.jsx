import { useTheme } from "@/app/contexts/ThemeContext"
import { Sun, Moon } from "lucide-react" // Import icons for the toggle button

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    console.log(theme)
  
    return (
      <button
        onClick={toggleTheme}
        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    )
  }