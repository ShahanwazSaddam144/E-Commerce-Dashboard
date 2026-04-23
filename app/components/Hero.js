"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Trash2,
  AlertCircle,
  Check,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [productsPopup, setProductsPopup] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productRating: "",
    productReviews: "",
    productCategory: "",
    productDesc: "",
    productImage: null,
  });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const users = [
    { name: "Shahnawaz Sadam Butt", status: "Order Placed", amount: "$125.50" },
    { name: "Ali Khan", status: "In Transit", amount: "$89.99" },
    { name: "Hassan Raza", status: "Delivered", amount: "$250.00" },
    { name: "Ayesha Noor", status: "Order Placed", amount: "$145.75" },
    { name: "Zara Ahmed", status: "In Transit", amount: "$199.99" },
  ];

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Total Orders",
      value: users.length,
      icon: ShoppingCart,
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    {
      label: "Total Revenue",
      value: "$810.23",
      icon: TrendingUp,
      color: "purple",
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    {
      label: "Active Users",
      value: users.length,
      icon: Users,
      color: "orange",
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const getAvatarColor = (index) => {
    const colors = [
      "bg-linear-to-br from-blue-500 to-blue-600",
      "bg-linear-to-br from-purple-500 to-purple-600",
      "bg-linear-to-br from-pink-500 to-pink-600",
      "bg-linear-to-br from-green-500 to-green-600",
      "bg-linear-to-br from-orange-500 to-orange-600",
    ];
    return colors[index % colors.length];
  };

  const getStatusBadge = (status) => {
    const styles = {
      "Order Placed": "bg-blue-100 text-blue-800",
      "In Transit": "bg-yellow-100 text-yellow-800",
      Delivered: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
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
              "",
            ),
          );

          return {
            ...item,
            imageUrl: `data:${item.productImage.contentType};base64,${base64}`,
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
        method: "DELETE",
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        showToast("success", "Product added successfully ✅");
        setProductsPopup(false);
        fetchProducts();
      } else {
        showToast("error", result.message);
      }
    } catch {
      showToast("error", "Server error ❌");
    }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });

    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  return (
    <>
      {/* Main Content Section */}
      <section className="bg-gray-100 p-6 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.bg} border ${stat.border} rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.text} bg-white p-3 rounded-lg`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="h-1 bg-linear-to-r from-blue-400 to-transparent rounded-full"></div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-500">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Package size={24} className="text-blue-600" />
                      Featured Products
                    </h2>
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                    rounded-lg font-medium transition-all duration-300 
                    transform hover:scale-105"
                      onClick={() => {
                        setProductsPopup(true);
                      }}
                    >
                      Add Product
                    </button>
                  </div>
                </div>

                {/* Products Carousel */}
                <div className="p-6">
                  {products.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      slidesPerView={1}
                      spaceBetween={20}
                      navigation
                      pagination={{ clickable: true }}
                      className="w-full"
                      breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                      }}
                    >
                      {products.map((item) => (
                        <SwiperSlide key={item._id}>
                          <div className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group h-full">
                            {/* Product Image */}
                            <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.productName}
                                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-48 bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                  <Package
                                    size={48}
                                    className="text-gray-500"
                                  />
                                </div>
                              )}
                              <div className="absolute top-3 right-3 bg-linear-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                ${item.productPrice}
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                  {item.productName}
                                </h3>
                                <p className="text-blue-600 text-sm font-medium">
                                  {item.productCategory}
                                </p>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400 text-sm">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                      {i < Math.floor(item.productRating)
                                        ? "⭐"
                                        : "☆"}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-gray-500 text-xs">
                                  ({item.productReviews} reviews)
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {item.productDesc}
                              </p>

                              {/* Delete Button */}
                              <button
                                onClick={() => setConfirmId(item._id)}
                                className="w-full mt-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn transform hover:scale-105 shadow-md hover:shadow-lg"
                              >
                                <Trash2 size={18} />
                                Delete
                              </button>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Package size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        No products yet
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Start by adding your first product
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders Sidebar */}
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingCart size={22} className="text-green-600" />
                    Recent Orders
                  </h2>
                </div>

                {/* Orders List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {users.map((user, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-blue-200"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md ${getAvatarColor(i)}`}
                      >
                        {getInitials(user.name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {user.name}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}
                        >
                          {user.status}
                        </span>
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          {user.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {confirmId && !deleteSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-200 flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Delete Product?
                </h2>
                <p className="text-gray-600 text-sm">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Are you sure you want to permanently delete this product? It
                will be removed from inventory and all orders.
              </p>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-300 text-sm transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(confirmId)}
                className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {deleteSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Product Deleted!
              </h2>
              <p className="text-gray-600 text-sm text-center">
                The product has been successfully removed from your inventory.
              </p>
            </div>
          </div>
        </div>
      )}
      {productsPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleAddProduct}
            className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Add Product
            </h2>

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />

            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />

            <input
              type="number"
              name="productRating"
              placeholder="Rating"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />

            <input
              type="text"
              name="productReviews"
              placeholder="Reviews"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />

            <select
              name="productCategory"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Select Category</option>
              <option value="Watches">Watches</option>
              <option value="Shoes">Shoes</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Bags">Bags</option>
            </select>

            <textarea
              name="productDesc"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            />

            <input
              type="file"
              name="productImage"
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductsPopup(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
      {toast.show && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-white flex items-center gap-2
    animate-in slide-in-from-right duration-300
    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.type === "success" ? "✔️" : "⚠️"}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </>
  );
};

export default Hero;
