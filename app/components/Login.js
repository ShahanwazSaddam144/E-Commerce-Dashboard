"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

        if (data.success) {
          window.location.href = "/dashboard";
        }
      } catch (err) {}
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setMsg("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!data.success) {
        setMsg(data.message);
        setSuccess(false);
      } else {
        setMsg("Login Successful");
        setSuccess(true);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setMsg("Server Error");
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px] flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg w-full pr-10 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {msg && (
          <p className={`text-center text-sm ${success ? "text-green-500" : "text-red-500"}`}>
            {msg}
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;