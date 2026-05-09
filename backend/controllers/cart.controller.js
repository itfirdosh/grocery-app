import User from "../models/user.model.js";

// Update Cart
export const updateCart = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { cartItems } = req.body;

    if (!cartItems) {
      return res.status(400).json({
        success: false,
        message: "cartItems missing",
      });
    }

    // 🔥 safest way (no silent DB issue)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.cartItems = cartItems;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user.cartItems,
    });

  } catch (error) {
    console.log("CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};