import React from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import Order from "../components/Orders";

const Orders = () => {
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
          <Order />
        </div>
      </main>
    </div>
    )
}

export default Orders;