import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import recipeBackground from "/assets/genie1.png";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await login(formData);
      setUser(userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="lg:flex lg:w-1/2 h-screen relative bg-gray-50 ">
        <img
          src={recipeBackground}
          alt="Login background"
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient drop-shadow-lg">
              KitchenGenie
            </h1>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8 animate-pulse"></div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email address"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
