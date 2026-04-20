"use client";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

        if (data.success) {
          setLoggedIn(true);
        }
      } catch (err) {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include"
      });
      window.location.href = "/";
    } catch (err) {}
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <h1 className="text-white text-xl font-semibold tracking-wide">
          E-Commerce Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 px-4 py-1.5 rounded-full text-sm text-white">
            Admin
          </div>

          {loggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;