"use client";

import React,{useEffect} from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Watches from "../components/Products/Watches";

const Products = () => {

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

    return(
    <div className="sm:flex sm:h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Content */}
        <div className="flex-1 overflow-y-auto">
          <Watches/>
        </div>
      </main>
    </div>
    );
}

export default Products;