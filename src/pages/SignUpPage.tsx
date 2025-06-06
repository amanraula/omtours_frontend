import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error
    console.log("Submitting signup", { email, username, password });
    try {
      await signup({ email, username, password });
      console.log("Signup success, redirecting...");
      navigate("/");
    } catch (err: any) {
      // If your store doesn't throw, you can set error here for extra feedback
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md w-full">
          <h1 className="mb-8 text-3xl text-center font-bold">Sign Up</h1>
          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="block border w-full p-3 rounded mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="block border w-full p-3 rounded mb-4"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="block border w-full p-3 rounded mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isSigningUp ? "Creating Account..." : "Sign Up"}
            </button> 
          </form>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
