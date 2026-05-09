import { useContext, useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate(); // ✅ FIXED

  const {
    user,
    setUser,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
  } = useContext(AppContext);

  // ✅ FIXED useEffect
  useEffect(() => {
    if (searchQuery?.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-orange-600">GharTak Grocery</h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} alt="" className="w-6 h-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cartCount ? cartCount() : 0} {/* ✅ FIXED */}
          </button>
        </div>

        {/* User */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-8 h-8"
            />
            <ul className="absolute top-9 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-50 text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 cursor-pointer"
              >
                My Order
              </li>

              <li
                onClick={() => setUser(null)}
                className="p-1.5 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        {user ? (
          <>
            <p onClick={() => navigate("/my-orders")}>My Order</p>
            <p onClick={() => setUser(null)}>Logout</p>
          </>
        ) : (
          <button onClick={() => setShowUserLogin(true)}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;