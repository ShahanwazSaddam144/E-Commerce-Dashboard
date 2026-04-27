"use client";

import React from "react";
import { TrendingUp, BarChart3 } from "lucide-react";

const Stat = ({ title, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

export default function AnalyticsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 text-sm mt-1">Overview of sales, traffic and performance.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">Export</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Stat title="Revenue (30d)" value="$12,430" />
          <Stat title="Orders (30d)" value="1,240" />
          <Stat title="Conversion" value="3.8%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={20} className="text-blue-600" />
              <h3 className="font-semibold text-gray-900">Sales chart</h3>
            </div>
            <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-white rounded-lg flex items-center justify-center text-gray-400">
              <p>Chart placeholder</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 size={20} className="text-green-600" />
              <h3 className="font-semibold text-gray-900">Top Products</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Blue Hoodie</span>
                <span className="text-sm font-medium text-gray-900">340</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Red Shirt</span>
                <span className="text-sm font-medium text-gray-900">210</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Sneakers</span>
                <span className="text-sm font-medium text-gray-900">185</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
