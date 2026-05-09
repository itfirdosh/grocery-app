import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { products, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const product = products?.find((item) => item._id === id);

  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (product) {
      setThumbnail(product.image?.[0] || "");
    }
  }, [product]);

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="mt-16">

      {/* Breadcrumb */}
      <p className="text-sm">
        <Link to="/">Home</Link> /
        <Link to={`/categories/${product.category}`}> {product.category}</Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">

        {/* Images */}
        <div className="flex gap-3">

          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt=""
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Details */}
        <div className="text-sm w-full md:w-1/2">

          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={
                  i < product.rating
                    ? assets.star_icon
                    : assets.star_outline_icon
                }
                className="w-3.5 md:w-4"
              />
            ))}
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: ${product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: ${product.offerPrice}
            </p>
          </div>

          {/* Description FIXED */}
          <p className="text-base font-medium mt-6">About Product</p>

          <p className="text-gray-500/70">
            {Array.isArray(product.description)
              ? product.description.join(", ")
              : product.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">

            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;