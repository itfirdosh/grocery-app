import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FIX: keep object format
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
};