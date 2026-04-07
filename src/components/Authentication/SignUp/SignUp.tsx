export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-xl hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <a href="/login" className="text-blue-500 ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
