"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Trash2, AlertCircle, Check } from "lucide-react";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const users = [
    { name: "Shahnawaz Sadam Butt", status: "Order Placed" },
    { name: "Ali Khan", status: "In Transit" },
    { name: "Hassan Raza", status: "Delivered" },
    { name: "Ayesha Noor", status: "Order Placed" },
    { name: "Zara Ahmed", status: "In Transit" }
  ];

  const getInitials = (name) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase();

  const getAvatarColor = (name) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-green-500 to-green-600",
      "from-orange-500 to-orange-600"
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      const formatted = (data.prodcuts || []).map((item) => {
        if (item.productImage?.data) {
          const base64 = btoa(
            new Uint8Array(item.productImage.data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          return {
            ...item,
            imageUrl: `data:${item.productImage.contentType};base64,${base64}`
          };
        }
        return item;
      });

      setProducts(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE"
      });
      setProducts(products.filter((p) => p._id !== id));
      setDeleteSuccess(true);
      setTimeout(() => {
        setConfirmId(null);
        setDeleteSuccess(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Main Hero Section */}
      <section className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 py-8">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              Dashboard
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Manage your products and orders with ease
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* Stats Cards */}
            <div className="md:col-span-3 lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Products", value: products.length, icon: "📦" },
                  { label: "Total Orders", value: users.length, icon: "🛒" },
                  { label: "Revenue", value: "$12,450", icon: "💰" }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs sm:text-sm font-medium">{stat.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div className="text-2xl sm:text-3xl">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
              <h3 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm">
                  Add Product
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm border border-gray-300">
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Products Carousel */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all duration-300">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Featured Products
                </h2>

                {products.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation
                    pagination={{ clickable: true }}
                    className="w-full"
                    breakpoints={{
                      640: {
                        slidesPerView: 1
                      },
                      1024:{
                        slidesPerView: 1
                      }
                    }}
                  >
                    {products.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300 group h-full">
                          {/* Product Image */}
                          <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-full h-40 sm:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600 text-xs sm:text-sm">No Image</span>
                              </div>
                            )}
                            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              ${item.productPrice}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="space-y-2">
                            <div>
                              <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
                                {item.productName}
                              </h3>
                              <p className="text-blue-600 text-xs sm:text-sm font-medium">
                                {item.productCategory}
                              </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="flex text-yellow-400 text-xs sm:text-sm">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < Math.floor(item.productRating) ? "⭐" : "☆"}
                                  </span>
                                ))}
                              </div>
                              <span className="text-gray-500 text-xs">
                                ({item.productReviews})
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                              {item.productDesc}
                            </p>

                            {/* Action Button */}
                            <button
                              onClick={() => setConfirmId(item._id)}
                              className="w-full mt-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 group/btn text-xs sm:text-sm"
                            >
                              <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📭</div>
                    <p className="text-gray-600 text-base sm:text-lg font-medium">No products found</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2">Add your first product to get started</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Orders Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>

                <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {users.map((user, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg p-2 sm:p-3 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(user.name)} flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0 shadow-md`}
                        >
                          {getInitials(user.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scrollbar Styles */}
                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {confirmId && !deleteSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-300 rounded-xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-200">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Delete Product?</h2>
                <p className="text-gray-500 text-xs">This action cannot be undone</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Are you sure you want to permanently delete this product from your inventory? This will remove it from all orders and cannot be recovered.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(confirmId)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {deleteSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-300 rounded-xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center justify-center p-6 sm:p-8">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-pulse">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Product Deleted</h2>
              <p className="text-gray-600 text-xs sm:text-sm text-center">
                The product has been successfully removed from your inventory.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;