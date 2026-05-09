import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Cart = () => {

  const {
    products,
    totalCartAmount,
    cartItems,
    removeFromCart,
    updateCartItem,
    savedAddress,
    axios,
    user
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const subtotal = totalCartAmount();
  const shippingFee = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.02;
  const finalTotal = subtotal + shippingFee + tax;

  // ✅ FIXED: fetch address properly (NO backend import)
  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");

      if (data.success) {
        setAddress(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message || "Failed to fetch address");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch address");
    }
  };

  // ✅ fetch address when user changes
  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  // cart build
  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((p) => String(p._id) === String(key));

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key]
        });
      }
    }

    setCartArray(tempArray);
  };
  const handlePlaceOrder = async () => {
    // 1. Basic Validations
    if (cartArray.length === 0) {
      return toast.error("Your cart is empty!");
    }
    if (!selectedAddress) {
      return toast.error("Please select a delivery address.");
    }

    try {
      // 2. Order ka data prepare karna
      const orderData = {
        items: cartArray,
        amount: finalTotal,
        address: selectedAddress,
        paymentMethod: paymentOption
      };

      // 3. Agar payment method COD hai
      if (paymentOption === "COD") {
        // Yahan apne backend ka COD order API endpoint daalein
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map(item => ({
            product: item._id,
            quantity: item.quantity 
          })),
          address: selectedAddress,
          amount: finalTotal
        });

        if (data.success) {
          toast.success("Order Placed Successfully via COD!");
          // Optional: Agar aapke context me clearCart function hai toh usko call karein
          // clearCart(); 
          
          // Order place hone ke baad Orders page par bhej dein
          navigate("/my-orders"); 
        } else {
          toast.error(data.message || "Failed to place order");
        }
      } 
      
      // 4. Agar payment method Online hai
      else if (paymentOption === "Online") {
        // Online payment ka logic yahan aayega
        toast.info("Processing Online Payment...");
        
        // Yahan backend API call hogi jo Razorpay/Stripe ka order create karegi
        // const { data } = await axios.post("/api/order/place-online", orderData);
        // ... (Payment Gateway integration code)
      }

    } catch (error) {
      
      toast.error(error.response?.data?.message || "Something went wrong while placing order");
    }
  };

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      getCart();
    } else {
      setCartArray([]);
    }
  }, [products, cartItems]);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">

      {/* LEFT */}
      <div className='flex-1 max-w-4xl'>
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart
          <span className="text-sm text-indigo-500 ml-2">
            {cartArray.length} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3">

            <div className="flex items-center gap-4">

              <img
                className="w-20 h-20 object-cover border"
                src={`http://localhost:5000/images/${product.image?.[0]}`}
                alt="product"
              />

              <div>
                <p className="font-semibold">{product.name}</p>

                <div className="text-gray-500 text-sm">
                  <p>Qty:</p>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    className="border px-1"
                  >
                    {Array(5).fill('').map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center">
              ₹{product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="text-red-500 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate('/products')}
          className="mt-8 text-indigo-500"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="max-w-[360px] w-full bg-gray-100 p-5 mt-10 md:mt-0 border">

        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-4" />

        <div>
          <p className="text-sm font-medium">Delivery Address</p>

          <div className="mt-2 text-gray-600 text-sm">
            {selectedAddress ? (
              <div>
                <p className="font-medium">{selectedAddress.fullName}</p>
                <p>{selectedAddress.phone}</p>
                <p>{selectedAddress.street}, {selectedAddress.city}</p>
                <p>{selectedAddress.state} - {selectedAddress.pincode}</p>
                <p>{selectedAddress.country}</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => navigate("/AddAddress")}
              className="px-3 py-1 border rounded text-indigo-500"
            >
              Change
            </button>

          
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border px-2 py-1 mt-1 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="my-4" />

        <div className="space-y-2 text-gray-700">

          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{subtotal}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </p>

          <hr />

          <p className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </p>

        </div>

        <button 
        onClick={handlePlaceOrder} // Yahan function attach kiya
    disabled={!selectedAddress || cartArray.length === 0} // Agar address ya cart khali hai toh disable
    className={`w-full mt-4 py-2 text-white ${
      !selectedAddress || cartArray.length === 0 
        ? "bg-gray-400 cursor-not-allowed" 
        : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
    }`} >
        Place Order
        </button>

      </div>
    </div>
  );
};

export default Cart;