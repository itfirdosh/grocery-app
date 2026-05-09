import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
//import { set } from "mongoose";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ================= SELLER =================
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      setIsSeller(!!data.success);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // ================= PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    }
  };

  // ================= CART ACTIONS =================
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    toast.success("Added to cart");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (!updated[itemId]) return updated;

      updated[itemId] -= 1;

      if (updated[itemId] <= 0) {
        delete updated[itemId];
      }

      return updated;
    });

    toast.success("Item removed");
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = quantity;
      }

      return updated;
    });
  };

  // ================= CART COUNT =================
  const cartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  // ================= TOTAL AMOUNT =================
  const totalCartAmount = () => {
    let total = 0;

    for (let id in cartItems) {
      const product = products.find((p) => String(p._id) === String(id));

      if (product) {
        total += cartItems[id] * product.offerPrice;
      }
    }

    return Number(total.toFixed(2));
  };

  // ================= CART SYNC (FIXED) =================
  useEffect(() => {
  const syncCart = async () => {
    try {
      await axios.post("/api/cart/update", {
        cartItems,
      });
    } catch (error) {
      console.log("Cart Sync Error:", error.message);
    }
  };

  syncCart();
}, [cartItems]);
  // ================= INIT =================
  useEffect(() => {
    fetchProducts();
    fetchSeller();
  
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    cartCount,
    totalCartAmount,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
    fetchSeller,
    setCartItems,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;