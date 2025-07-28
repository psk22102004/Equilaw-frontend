import { useState, useContext } from "react";
// import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { loadingContext } from "../contexts/LoadingContext";
import { FaUserPlus, FaLock, FaArrowRight } from "react-icons/fa";

export default function Signup() {
  const { signup } = useContext(authContext);
  const { loading, setLoading, error, setError } = useContext(loadingContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const success = await signup(email, password, firstName, lastName);
    if (success) {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  } else {
    return (
      <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-raleway"
      >
        <div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="container bg-gray-900 bg-white/5 rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <div className="p-10 flex flex-col justify-center">
            <h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white mb-6 text-center"
            >
              Sign Up
            </h1>
            <form onSubmit={handleSignup} className="space-y-6">
              {[
                {
                  label: "First name",
                  value: firstName,
                  setValue: setFirstName,
                },
                { label: "Last name", value: lastName, setValue: setLastName },
                { label: "Email", value: email, setValue: setEmail },
              ].map((field, index) => (
                <div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <FaUserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={field.label}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    required
                    className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-[#009dc0] outline-none transition-all"
                  />
                </div>
              ))}
              <div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative"
              >
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-[#009dc0] outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#00c5e5] hover:bg-[#009dc0] text-white py-3 rounded-lg transition-all"
              >
                Sign Up
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-[#009dc0] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-[#009dc0] via-transperant to-[#0d647d] text-white p-10 font-raleway"
          >
            <h2 className="text-4xl font-bold">Welcome to NeuraCV</h2>
            <p className="text-lg mt-4 text-center leading-relaxed">
              Create an account and start your journey to building your perfect
              resume
            </p>
            <div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowRight className="mt-6 text-6xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
