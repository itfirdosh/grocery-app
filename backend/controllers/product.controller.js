import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;

    const image = req.files ?.map((file) => file.filename);
    if(
        !name ||
        !price ||
        !offerPrice ||
        !description ||
        !category ||
        !image ||
        image.length === 0
    ){
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }
    

    const newProduct = new Product({
      name,
      description,
      price,
      offerPrice,
      category,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

//get products : /api/product/get

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
      success: true
    });

  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Failed to retrieve products",
      error: error.message,
      success: false
    });
  }
};

//get product by id : /api/product/get/:id

export const getProductById = async (req, res) => { 
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Product retrieved successfully",
            product,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve product",
            error: error.message,
            success: false
        });
    }
};

//delete product by id : /api/product/delete/:id

export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            product,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message,
            success: false
        });
    }
};

//change stock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Stock updated successfully",
            product,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update stock",
            error: error.message,
            success: false
        });
    }
};
