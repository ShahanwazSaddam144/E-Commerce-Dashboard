"use client";

import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Hero from "../components/Hero";

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
    <div className="sm:flex sm:min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen md:ml-0">
        <Hero />
      </main>
    </div>
  );
};

export default Dashboard;