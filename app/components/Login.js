"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, LogIn, CheckCircle, AlertCircle } from "lucide-react";

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
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {
      setMsg("Server Error");
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>

      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
          
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">📦</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">E-Store</h1>
            <p className="text-blue-200 text-sm">Professional E-Commerce Dashboard</p>
          </div>

          <div className="mb-5">
            <label className="text-white text-sm font-semibold mb-2 block">Email Address</label>
            <input
              type="email"
              placeholder="admin@estore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
            />
          </div>

          <div className="mb-6">
            <label className="text-white text-sm font-semibold mb-2 block">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {msg && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
              success
                ? "bg-green-500/20 border border-green-400/50 text-green-200"
                : "bg-red-500/20 border border-red-400/50 text-red-200"
            }`}>
              {success ? (
                <CheckCircle size={20} className="flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{msg}</span>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>

          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-white/60 text-xs sm:text-sm">
              Demo Credentials • Admin Access Only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;