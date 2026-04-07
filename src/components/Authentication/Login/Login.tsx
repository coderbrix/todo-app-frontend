import './Login.css'

export default function Login() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-xl hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}