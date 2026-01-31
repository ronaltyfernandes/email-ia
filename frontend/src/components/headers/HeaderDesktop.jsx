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
        min-h-[75px]
        items-center
        px-8
      "
    >
      <div className="sombra-azul">▲utoU</div>
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
