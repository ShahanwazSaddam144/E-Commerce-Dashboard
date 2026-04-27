"use client";

import React, { useState } from "react";

const Order = () => {
  const [orders] = useState([
    {
      id: "#ORD-1001",
      customer: "Ali Khan",
      email: "ali@gmail.com",
      date: "2026-04-25",
      total: 12500,
      status: "Pending",
      payment: "COD",
      products: [
        { name: "Smart Watch", qty: 1, price: 5000 },
        { name: "Wireless Earbuds", qty: 2, price: 3750 }
      ]
    },
    {
      id: "#ORD-1002",
      customer: "Hassan Raza",
      email: "hassan@gmail.com",
      date: "2026-04-24",
      total: 8900,
      status: "Shipped",
      payment: "Card",
      products: [
        { name: "Gaming Mouse", qty: 1, price: 3000 },
        { name: "Keyboard", qty: 1, price: 5900 }
      ]
    }
  ]);

  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const statusColor = (status) => {
    if (status === "Pending") return "bg-yellow-50 text-yellow-600";
    if (status === "Shipped") return "bg-blue-50 text-blue-600";
    if (status === "Delivered") return "bg-green-50 text-green-600";
    if (status === "Cancelled") return "bg-red-50 text-red-600";
    return "bg-gray-50 text-gray-600";
  };

  return (
    <div className="p-6">
      <header className="mt-2 ml-2 w-[250px]">
        <h1 className="text-[30px] font-bold tracking-tight">Client Orders</h1>
        <div className="bg-blue-600 w-full h-[3px] rounded-full mt-1" />
      </header>

      <div className="mt-6 flex gap-2 flex-wrap">
        {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              filter === item
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 shadow-sm hover:shadow-md"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="p-5">Order</th>
              <th className="p-5">Customer</th>
              <th className="p-5">Date</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Total</th>
              <th className="p-5">Status</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-5 font-semibold">{order.id}</td>
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-xs text-gray-400">{order.email}</span>
                  </div>
                </td>
                <td className="p-5 text-gray-500">{order.date}</td>
                <td className="p-5 text-gray-500">{order.payment}</td>
                <td className="p-5 font-medium">Rs {order.total}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-5">
                  <button onClick={() => setSelectedOrder(order)} className="text-blue-600 text-sm font-medium hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-6 text-center text-gray-400">No orders found</div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedOrder.id} Products</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            <div className="space-y-3">
              {selectedOrder.products.map((p, i) => (
                <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">Qty: {p.qty}</p>
                  </div>
                  <p className="font-semibold">Rs {p.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 text-right font-semibold">Total: Rs {selectedOrder.total}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersPage = () => {
  return (
    <div className="sm:flex sm:h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Order />
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;