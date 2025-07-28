import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { loadingContext } from "../contexts/LoadingContext";
import { FaEnvelope, FaLock } from "react-icons/fa";
// import { motion } from "framer-motion";

export default function Login() {
  const {login} = useContext(authContext);
  const {loading , setLoading , error , setError} = useContext(loadingContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/user");
    } else {
      console.log("Error:",error);
    }
  };

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative font-raleway">
      
      {/* Loader with Framer Motion */}
      {loading && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="w-16 h-16 border-4 border-t-4 border-t-[#0d647d] border-gray-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      )}

      {/* Login Card with Fade-in Animation */}
      <div
        className="container mx-auto h-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        
        {/* Left Side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h1
            className="text-4xl font-bold text-[#0d647d] mb-6 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Login
          </h1>
 
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-[#0d647d] outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-[#0d647d] outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00c5e5] hover:bg-[#0d647d] text-white py-3 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Login
            </button>

            {error && (
              <p
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                {error}
              </p>
            )}
          </form>

          <div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#0d647d] hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Info Section */}
        <div
          className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-[#009dc0]  to-[#0d647d] text-white p-10"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="text-lg mt-4 text-center leading-relaxed">
            Let's get back to work and continue building your resume.
          </p>
        </div>
      </div>
    </div>
  );
}
