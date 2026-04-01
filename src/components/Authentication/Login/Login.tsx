import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setError("");
    }, 50);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) {
        if (email === "test@gmail.com" && password === "123456") {
          localStorage.setItem("token", "demo123");
          localStorage.setItem("currentUser", JSON.stringify({
            name: "Test User",
            email: "test@gmail.com"
          }));
          navigate("/home");
          return;
        } else {
          throw new Error("No account found. Please sign up first.");
        }
      }

      const userData = JSON.parse(storedUser);
      
      if (userData.email === email && userData.password === password) {
        localStorage.setItem("token", "demo123");
        
        localStorage.setItem("currentUser", JSON.stringify({
          name: userData.name,  
          email: userData.email
        }));
        
        navigate("/home");
      } else {
        throw new Error("Invalid email or password");
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-xl hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 ml-1 cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}