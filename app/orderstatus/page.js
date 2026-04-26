import React from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import OrderStatus from "../components/OrderStatus";

const orderStatus = () =>{
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
          <OrderStatus />
        </div>
      </main>
    </div>
    )
}

export default orderStatus;