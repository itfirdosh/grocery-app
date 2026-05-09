import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIX HERE

    const addressData = {
      userId,
      ...req.body.address,
    };

    const address = await Address.create(addressData);

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      address,
    });

  } catch (error) {
    console.log("Error adding address:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIX HERE

    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      addresses,
    });

  } catch (error) {
    console.log("Error getting address:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};