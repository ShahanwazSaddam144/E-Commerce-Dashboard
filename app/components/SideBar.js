"use client";

import React, { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react";

const SideBar = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-gray-900">E-Store</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          {open ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static top-16 md:top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 flex flex-col shadow-xl overflow-y-auto`}>
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
            E
          </div>
          <div>
            <h1 className="font-bold text-lg">E-Store</h1>
            <p className="text-xs text-gray-400">Store Dashboard</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Main Menu</p>
          <ul className="space-y-1">
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <ChevronDown size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-700 space-y-3 flex-shrink-0">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-xs text-gray-300 mb-1">Logged in as</p>
            <p className="text-sm font-semibold truncate">Admin User</p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm sm:text-base transform hover:scale-105"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30 animate-fade-in"
        />
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
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
                You will be logged out of your account and redirected to the login page. All unsaved changes will be lost.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-300 text-sm transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
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