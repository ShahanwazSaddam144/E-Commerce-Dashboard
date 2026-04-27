"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import Notifications from "./Notifications";

const Navbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-white">E</span>
            </div>
            <Link href={"/dashboard"}><h1 className="text-xl font-bold text-gray-900 hidden sm:block">E-Store Dashboard</h1></Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotif((s) => !s)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
              >
                <Bell size={20} className="text-gray-600 group-hover:text-gray-900" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <Notifications open={showNotif} onClose={() => setShowNotif(false)} />
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <Settings size={20} className="text-gray-600 hover:text-gray-900" />
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;