"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  async function handleSignup() {
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const res = await response.json();
    if (res.success) {
      setShowOtpInput(true);
      setError("");
    } else {
      setError(res.message || "Error signing up");
    }
  }

  async function verifyOtp() {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, otp }),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("userEmail", email);
      window.location.href = "/dashboard";
    } else {
      setError(data.message || "Error logging in");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-1/2 p-8 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {showOtpInput ? "Enter OTP" : "Sign Up"}
        </h2>

        {!showOtpInput ? (
          <>
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button
              onClick={handleSignup}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              required
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtp}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="text-red-500 text-center mt-5">{error}</p>
      </div>
    </div>
  );
}
