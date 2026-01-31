import { NavLink } from "react-router-dom"

function NavLinkHeader({text, to, ...props}) {
  return (
    <NavLink
    {...props}
    to={to}
    className={({ isActive }) =>
      `relative px-2.5 py-2 text-sm font-medium
       transition-colors duration-300
       after:absolute after:left-0 after:bottom-0 after:h-0.5
       after:w-full after:origin-left after:scale-x-0
       after:bg-blue-500 after:transition-transform after:duration-300
       hover:text-blue-500 hover:after:scale-x-100
       ${isActive ? "text-text after:scale-x-100" : "text-text"}`
    }
  >
    {text}
  </NavLink>
  )
}

export default NavLinkHeader