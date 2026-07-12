import { useTheme } from "../../contexts/ThemeContext";
import { ThemeSwitch } from "../../ui/ThemeSwitch";
import NavLinkHeader from "../../ui/NavLink";

export function HeaderDesktop() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="
        bg-bg-secondary
        text-text
        flex justify-around
        min-h-18.75
        items-center
        px-8
        shadow-black
      "
    >
      {/* logo */}
      <div className="flex items-center gap-2 select-none">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg">
          AI
        </div>

        <div className="flex flex-col leading-none">
          <span className="text-xl font-extrabold tracking-tight text-text">
            Email
            <span className="text-blue-500">IA</span>
          </span>
          <span className="text-xs tracking-[0.3em] text-text-secondary uppercase">
            Assistant
          </span>
        </div>
      </div>

      <nav className="">
        <NavLinkHeader end to="/" text="Home" />
        <NavLinkHeader to="/respostas" text="Respostas" />
      </nav>

      <ThemeSwitch
        toggleTheme={toggleTheme}
        isDark={theme === "dark"}
      />

    </div>
  );
}
