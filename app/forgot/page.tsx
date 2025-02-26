"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleForgot() {

  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter your email</h2>
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleForgot}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Send Link
        </button>

        <p className="text-red-500 text-center mt-5">{error}</p>

        </div>
    </div>
  );
}
