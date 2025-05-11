const Input = ({
  type = "text",
  name,
  value,
  onChange,
  onKeyPress,
  className = "",
  placeholder,
  required = false,
  icon,
  error,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon === "search" && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          icon === "search" ? "pl-10" : ""
        } ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        required={required}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
