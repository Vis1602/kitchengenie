import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/api";
import Button from "./ui/Button";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {user && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Top row: Logo + Logout (always shown) */}
            <div className="flex w-full justify-between items-center">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 animate-gradient">
                KitchenGenie
              </h1>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-sm transition rounded-md"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
        {/* Mobile: Welcome below */}
        <span className=" text-center text-gray-700 ">
          Welcome,{" "}
          <span className="text-indigo-600 font-medium">{user.username}</span>!
        </span>
      </div>
    </header>
  );
}
