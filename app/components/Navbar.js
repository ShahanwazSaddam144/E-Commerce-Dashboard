"use client";

import React, { useEffect, useState } from "react";

const Navbar = () => {
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
        </div>

      </div>
    </nav>
  );
};

export default Navbar;