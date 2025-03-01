"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("userEmail", email);
      window.location.href = "/login/mfa";
    } else {
      setError(data.message || "Error logging in");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
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
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-red-500 text-center mt-5">{error}</p>

        <div className="flex items-center justify-between mt-5">
          <button
            className="w-1/4 px-2 py-2 bg-blue-300 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          > 
            <Link href="/signup">Sign Up</Link>
          </button>

          <button
            className="w-1/3 px-2 py-2 bg-blue-300 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          > 
            <Link href="/forgot">Forgot Password</Link>
          </button>
        </div>

      </div>
    </div>
  );
}
