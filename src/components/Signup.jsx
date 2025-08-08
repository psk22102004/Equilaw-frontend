import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { loadingContext } from "../contexts/LoadingContext";
import { ArrowRight, MailIcon } from "lucide-react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Arrow } from "@radix-ui/react-popover";

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-700">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4">
                <svg className="text-blue-600 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">Create Account</h1>
              <p className="text-gray-600">Join Equilaw and revolutionize legal research</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <MailIcon  className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"/>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="relative">
                <LockClosedIcon className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"/>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                Create Account
               <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Hero */}
        <div className="bg-blue-600/60 from-white to-blue-100 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white-600 rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          <div className="relative z-10 max-w-md mx-auto text-center lg:text-left">
            <div className="mb-8">
              <img src="/new-logo.svg" className="w-32 h-16"/>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight font-playfair text-black">
                One stop solution for legal{' '}
                <span className="text-blue-800 italic">research!</span>
              </h2>
              
              <p className="text-blue-100 text-lg leading-relaxed">
                Simplify legal research, automate document analysis, and digitalize case management with cutting-edge AI tailored for commercial courts.
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}