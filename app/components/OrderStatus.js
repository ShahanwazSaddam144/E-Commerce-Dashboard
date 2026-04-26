"use client";

import React, { useEffect, useState } from "react";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orderstatus");
      const data = await res.json();
      setOrders(data.orderStatus);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAdd = async () => {
    if (!orderId || !orderStatus) return;
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/orderstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, orderStatus }),
      });
      setOrderId("");
      setOrderStatus("");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const confirmUpdate = async () => {
    if (!newStatus) return;
    try {
      await fetch("http://localhost:5000/api/orderstatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: selectedId, orderStatus: newStatus }),
      });
      setShowUpdate(false);
      setNewStatus("");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await fetch("http://localhost:5000/api/orderstatus", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: selectedId }),
      });
      setShowDelete(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Order Status</h1>

      <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-3 transition-all duration-300">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-xl outline-none w-full focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Order Status"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-xl outline-none w-full focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-gray-600 text-sm">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 font-medium text-gray-800">
                  {item.orderId}
                </td>
                <td className="p-4 text-gray-600">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                    {item.orderStatus}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedId(item.orderId);
                      setShowUpdate(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-yellow-400/90 text-white hover:scale-105 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item.orderId);
                      setShowDelete(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-red-500/90 text-white hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-gray-400">No orders found</p>
        )}
      </div>

      {showUpdate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl scale-95 animate-scaleIn">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Update Status
            </h2>
            <input
              type="text"
              placeholder="New Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 rounded-lg outline-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUpdate(false)}
                className="px-3 py-1 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl scale-95 animate-scaleIn">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Delete Order
            </h2>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDelete(false)}
                className="px-3 py-1 rounded-lg bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 rounded-lg bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;