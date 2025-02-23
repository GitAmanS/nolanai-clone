"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard"; // Redirect after storing the token
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Token stored in localStorage");
      window.location.href = "/dashboard"; // Redirect to dashboard or any protected route
    } catch (err) {
      setError("Server error");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="bg-[#1d232c] min-h-screen ">
      <Header />
      <div className="flex font-lexend h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        {/* Left Section */}
        <div className="w-full flex pl-16 items-center justify-center text-white p-10">
          <div>
            <h2 className="text-3xl font-bold">LOG IN</h2>
            <h1 className="text-[40px] whitespace-nowrap font-[300] leading-relaxed mt-4">
              Unlock <span className="font-extrabold text-6xl">the</span> full{" "}
              <span className="font-extrabold text-6xl text-white">NOLAN</span>{" "}
              <br />
              Experience
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full flex mx-8 pr-16 items-center justify-center">
          <div className="bg-[#1A1E25] p-10 px-24 rounded-xl shadow-lg w-full">
            <h2 className="text-white font-[300] text-3xl mb-6 text-center">
              LOG IN
            </h2>

            {showEmailForm ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-500 text-white font-medium py-3 shadow-md"
                >
                  Log In
                </button>
              </form>
            ) : (
              <>
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md"
                >
                  <img
                    src="/google-icon.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Continue with Google
                </button>

                <button className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md">
                  <img
                    src="/facebook-icon.svg"
                    alt="Facebook"
                    className="w-5 h-5 mr-2"
                  />
                  Continue with Facebook
                </button>

                <button
                  onClick={() => setShowEmailForm(true)}
                  className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md"
                >
                  <img
                    src="/email-icon.svg"
                    alt="Email"
                    className="w-5 h-5 mr-2"
                  />
                  Continue with Email
                </button>
              </>
            )}

            <p className="text-center text-blue-400 mt-4 cursor-pointer">
              Forgot Password?
            </p>

            <p className="text-xs text-gray-400 mt-6 text-center">
              By signing up, you agree to the{" "}
              <span className="text-blue-400">Terms of Service</span> and{" "}
              <span className="text-blue-400">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
