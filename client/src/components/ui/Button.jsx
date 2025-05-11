const Button = ({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const variants = {
    primary: `bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white`,
    secondary: `bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800`,
    danger: `bg-red-500 hover:bg-red-600 active:bg-red-700 text-white`,
  };

  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-md font-medium transition-colors ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : variants[variant]
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
