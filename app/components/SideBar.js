"use client";

import React, { useState } from "react";
import { Home, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from "lucide-react";

const SideBar = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include"
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Mobile Header - Keep as is */}
      <div className="md:hidden flex items-center justify-between bg-blue-600 text-white p-4">
        <h1 className="font-bold">E-Commerce</h1>
        <button onClick={() => setOpen(true)} className="text-2xl">☰</button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static top-16 md:top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 flex flex-col shadow-2xl`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-500/30 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">📦</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">E-Store</h1>
              <p className="text-xs text-blue-200">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white shadow-lg border-l-4 border-white"
                        : "hover:bg-white/10 text-blue-100 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-blue-500/30 space-y-3">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs text-blue-200 mb-2">Logged in as</p>
            <p className="text-sm font-semibold truncate">Admin User</p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-start gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LogOut className="text-red-600" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Confirm Logout</h2>
                <p className="text-gray-600 text-sm">Are you sure you want to logout?</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                You will be logged out of your account and redirected to the login page.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;