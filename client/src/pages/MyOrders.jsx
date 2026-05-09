import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <p className="text-2xl font-medium md:text-3xl mb-6">My Orders</p>

      {myOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="mb-10 border border-gray-300 rounded-lg max-w-4xl"
          >
            {/* ORDER HEADER */}
            <div className="p-4 border-b flex flex-wrap justify-between gap-4">
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total: ₹{order.amount}</span>
            </div>

            {/* ORDER ITEMS */}
            {order.items?.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${
                  order.items.length !== i + 1 ? "border-b" : ""
                }`}
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={'http://localhost:5000/images/' + item.productId?.image?.[0]}
                    alt={item.productId?.name || "Product"}
                    className="w-16 h-16 object-cover"
                  />

                  <div>
                    <h2 className="text-lg font-medium">
                      {item.productId?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.productId?.category}
                    </p>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="text-sm mt-3 md:mt-0">
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Date:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>

                {/* RIGHT */}
                <p className="text-lg font-medium mt-3 md:mt-0">
                  ₹
                  {(item.productId?.offerPrice || item.productId?.price || 0) *
                    (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;