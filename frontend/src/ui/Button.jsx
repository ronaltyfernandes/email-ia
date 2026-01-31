function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-400 text-white"
  };

  return (
    <button
      className={`
        px-4 py-2 rounded
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;