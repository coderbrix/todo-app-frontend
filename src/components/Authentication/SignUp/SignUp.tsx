import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import './SignUp.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    
    
    const form = document.querySelector('form');
    if (form) {
      form.reset();
    }
    
    setError("");
    setSuccess("");
  }, []);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      
      
      const existingUser = localStorage.getItem("user");
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        if (userData.email === formData.email) {
          throw new Error("Email already exists");
        }
      }

      
      await new Promise(resolve => setTimeout(resolve, 1000));

      
      localStorage.setItem("user", JSON.stringify({
        name: formData.name, 
        email: formData.email,
        password: formData.password
      }));
      
      setSuccess("Signup successful...");
      
      
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      
      setTimeout(() => {
        navigate("/");   
      }, 1000);

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
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-3 border rounded-xl"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-xl hover:opacity-90"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-blue-500 ml-1 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}