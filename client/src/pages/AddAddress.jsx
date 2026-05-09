import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { axios, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving your address...");
    try {
      
      const { data } = await axios.post("/api/address/add", { address });
      
      if (data.success) {
        toast.success("Address saved successfully!");
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Address</h1>
          <p className="mt-2 text-gray-500 text-sm">Please enter the accurate delivery details to ensure timely shipping.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Form Card */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={submitHanlder} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">First Name</label>
                  <input type="text" name="firstName" value={address.firstName} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" 
                    placeholder="John" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Last Name</label>
                  <input type="text" name="lastName" value={address.lastName} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" 
                    placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Email Address</label>
                <input type="email" name="email" value={address.email} onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" 
                  placeholder="john@example.com" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Street Address</label>
                <input type="text" name="street" value={address.street} onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" 
                  placeholder="Apartment, suite, unit, etc." required />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">City</label>
                  <input type="text" name="city" value={address.city} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">State</label>
                  <input type="text" name="state" value={address.state} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" required />
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Zip Code</label>
                  <input type="number" name="zipCode" value={address.zipCode} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Country</label>
                  <input type="text" name="country" value={address.country} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Phone Number</label>
                  <input type="number" name="phone" value={address.phone} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-gray-50/30" required />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                  Save Address & Continue
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Info Section */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-4">Why we need this?</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Your address helps us calculate shipping costs and delivery time accurately. We never share your personal information.
              </p>
              <div className="mt-6 flex justify-center">
                <img src={assets.add_address_iamge} alt="Delivery" className="w-48 h-auto drop-shadow-2xl animate-pulse-slow" />
              </div>
            </div>
            
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6">
              <p className="text-gray-500 text-xs italic text-center">
                Safe & Secure Checkout Powered by MERN Stack
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddAddress;