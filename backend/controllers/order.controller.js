import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;

        console.log("userId:", userId);
        console.log("items:", JSON.stringify(items));
        console.log("address:", JSON.stringify(address));

        if (!items || !address) {
            return res.status(400).json({ message: "Items and address are required", success: false });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;
            amount += product.offerPrice * item.quantity;
        }
        amount += Math.floor(amount * 2 / 100);

        await Order.create({
            userId: userId,
            items: items.map(item => ({
                productId: item.product,
                quantity: item.quantity
            })),
            address: address._id || address,
            amount,
            paymentType: "COD",
            isPaid: false,
            status: "Order Placed"
        });

        res.status(201).json({ message: "Order placed successfully", success: true });

    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ message: "Failed to place order", success: false });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.productId")
        .populate("address")
        .sort({ createdAt: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error("Error fetching user orders:", error.message);
        res.status(500).json({ message: "Failed to fetch user orders", success: false });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.productId")
        .populate("address")
        .sort({ createdAt: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        res.status(500).json({ message: "Failed to fetch all orders", success: false });
    }
};