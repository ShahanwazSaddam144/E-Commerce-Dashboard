"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Trash2, AlertCircle } from "lucide-react";

const Watches = () => {
  const [products, setProducts] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

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
            imageUrl: `data:${item.productImage.contentType};base64,${base64}`,
          };
        }
        return item;
      });

      setProducts(formatted);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      setConfirmId(null);

      // refresh after delete
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      <section className="mt-10 px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Watches</h1>
          <div className="bg-blue-600 w-20 h-1 mt-2 rounded-full"></div>
        </header>

        {products.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products
              .filter((item) => item.productCategory === "Watches")
              .map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group">
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200"></div>
                      )}
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm shadow">
                        ${item.productPrice}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg text-gray-900">
                      {item.productName}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.productDesc}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(item.productRating) ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setConfirmId(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No watches available
          </div>
        )}
      </section>

      {confirmId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="text-red-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  Delete Product
                </h2>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(confirmId)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watches;