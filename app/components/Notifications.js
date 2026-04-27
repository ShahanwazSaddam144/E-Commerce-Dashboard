"use client";

import React from "react";
import { X } from "lucide-react";

const Notifications = ({ open, onClose }) => {
  if (!open) return null;

  const items = [
    { id: 1, title: "New order received", desc: "Order #1024 has been placed.", time: "2m ago" },
    { id: 2, title: "Low stock alert", desc: "Product 'Blue Shirt' is low on stock.", time: "1h ago" },
    { id: 3, title: "New user signed up", desc: "A new user registered.", time: "3h ago" }
  ];

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-80 bg-white/95 rounded-xl shadow-xl z-50 animate-in fade-in backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-semibold text-gray-900">Notifications</h4>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
          <X size={16} className="text-gray-600" />
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {items.map((it) => (
          <div key={it.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{it.title}</p>
                <p className="text-xs text-gray-500 mt-1">{it.desc}</p>
              </div>
              <div className="text-xs text-gray-400 ml-3">{it.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center">
        <button className="text-sm text-blue-600 hover:underline">View all</button>
      </div>
    </div>
  );
};

export default Notifications;
