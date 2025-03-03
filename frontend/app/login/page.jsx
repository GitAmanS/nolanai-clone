"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("User:", user);
      // router.push("/dashboard");
    }
  }, [user, router]);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <div className="bg-[#1d232c] min-h-screen">
      <Header />
      <div className="flex font-lexend h-screen bg-gradient-to-r from-gray-900 to-gray-800">
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

        <div className="w-full flex mx-8 pr-16 items-center justify-center">
          <div className="bg-[#1A1E25] p-10 px-24 rounded-xl shadow-lg w-full">
            <h2 className="text-white font-[300] text-3xl mb-6 text-center">LOG IN</h2>

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
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            ) : (
              <>
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md gap-3"
                >
                  <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>

                <button className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md gap-3">
                  <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
                  <span>Continue with Facebook</span>
                </button>

                <button
                  onClick={() => setShowEmailForm(true)}
                  className="flex items-center justify-center w-full rounded-full bg-white text-gray-800 font-medium py-3 mb-4 shadow-md gap-3"
                >
                  <img src="/email-icon.png" alt="Email" className="w-5 h-5" />
                  <span>Continue with Email</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
