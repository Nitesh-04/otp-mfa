"use client";
import { useEffect, useState } from "react";
import { generateOtp } from "../api/_actions/actions";

export default function MFA() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [recieveEnable, setRecieveEnable] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);

    const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
  
      return () => clearInterval(timer);
  }, []);

  async function resendOTP() {
    if (timeLeft === 0 || !recieveEnable) {
      try {
          await fetch("/api/resend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          alert("OTP sent!");
          setRecieveEnable(true);
      } catch (error) {
          console.error(error);
      }
      setTimeLeft(180);
    }
  }

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
      <div className="p-8 bg-white rounded-2xl shadow-lg text-center w-1/2">
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

        <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        disabled={timeLeft > 0}
        onClick={resendOTP}
        >
            {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
        </button>
        <button
        className="mt-4 ml-10 px-6 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        disabled={recieveEnable}
        onClick={resendOTP}
        >
            Didnt receive OTP?
        </button>
      </div>
    </div>
  );
}
