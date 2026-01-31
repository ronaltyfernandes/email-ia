import { Sun, Moon } from "lucide-react";

export function ThemeSwitch({ toggleTheme, isDark }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className={`
        relative w-20 h-10 flex items-center px-1
        rounded-full
        transition-colors duration-500 ease-in-out
        ${isDark ? "bg-slate-800" : "bg-slate-300"}
      `}
    >
      {/* Sol */}
      <Sun
        className={`
          w-9 h-4 z-10 transition-all duration-500
          ${isDark ? "text-yellow-400 opacity-30 scale-75" : "text-yellow-700 opacity-100 scale-100"}
        `}
      />

      {/* Lua */}
      <Moon
        className={`
          w-9 h-4 ml-auto z-10 transition-all duration-500
          ${isDark ? "text-slate-500 opacity-100 scale-100" : "text-slate-400 opacity-30 scale-75"}
        `}
      />

      {/* Bolinha */}
      <span
        className={`
          absolute top-1.5 left-1
          w-10 h-7 rounded-full
          shadow-md
          transition-transform duration-500 ease-in-out
          ${isDark ? "translate-x-8 bg-slate-100" : "translate-x-0 bg-white"}
        `}
      />
    </button>
  );
}
