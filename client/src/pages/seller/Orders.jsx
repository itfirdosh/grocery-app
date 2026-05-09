import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            {/* Products */}
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={'http://localhost:5000/images/' + order.items?.[0]?.productId?.image?.[0]}
                alt="box icon"
              />

              <div>
                {order.items?.map((item, i) => (
                  <div key={i} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.productId?.name || "Product"}
                      {item.quantity > 1 && (
                        <span className="text-indigo-500">
                          {" "}
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.state}, {order.address?.zipcode},{" "}
                {order.address?.country}
              </p>
            </div>

            {/* Amount */}
            <p className="font-medium text-base my-auto text-black/70">
              ₹{order.amount}
            </p>

            {/* Payment Info */}
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>
                Date:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : ""}
              </p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              <p>Status: {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;