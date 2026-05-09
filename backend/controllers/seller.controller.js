import jwt from "jsonwebtoken";

// seller login : /api/seller/login
export const sellerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // ✅ FIXED
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "Login Successful", success: true });
    }

    // ❗ invalid credentials case
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });

  } catch (error) {
    console.error("Error in sellerlogin:", error);
    res.status(500).json({ message: "internal server error" });
  }
};


// logout seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    // ✅ FIXED (cookie clear)
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res
      .status(200)
      .json({ message: "Logout Successful", success: true });

  } catch (error) {
    console.error("Error in sellerlogout:", error);
    res.status(500).json({ message: "internal server error" });
  }
};



//check auth seller: /api/seller/is-auth

export const isAuthSeller = (req, res) => {
    try {
      res.status(200).json({ message: "Seller is authenticated", success: true });
        
    } catch (error) {
      console.error("Error in isAuthSeller:", error);
      res.status(500).json({ message: "internal server error" });
        
    }
}