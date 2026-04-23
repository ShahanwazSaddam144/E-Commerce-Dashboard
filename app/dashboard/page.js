"use client";

import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

        if (!data.success) {
          window.location.href = "/";
        }
      } catch (err) {
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="sm:flex sm:h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Content */}
        <div className="flex-1 overflow-y-auto">
          <Hero />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;