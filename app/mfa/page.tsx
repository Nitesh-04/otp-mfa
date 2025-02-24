"use client";
import { useEffect, useState } from "react";

export default function MFA() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  async function handleVerifyOTP() {
    const response = await fetch("/api/mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (data.success) {
      alert("MFA successful! Redirecting...");
      window.location.href = "/dashboard";
    } else {
      alert(data.message || "Invalid OTP");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter your OTP"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOTP}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
