import React from 'react';
import { categories } from "../assets/assets";
import ProductCard from "../component/ProductCard";
import { AppContext } from "../context/AppContext"; // ✅ Make sure this matches your context file
import { useContext } from 'react'; // ✅ Import useContext
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  // ✅ Context ko sahi tarike se access karein
  const { products } = useContext(AppContext); 
  
  const { category } = useParams();

  // ✅ Safe Check: Optional chaining (?) ka use karein taaki undefined hone par crash na ho
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="mt-16 px-6 md:px-16">
      {searchCategory && (
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl md:text-4xl font-medium border-b-2 border-indigo-500 w-max pb-2">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}     

      {filteredProducts.length > 0 ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            // ✅ Index ki jagah product._id use karna better hai
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl md:text-3xl font-light text-gray-500">
            No products found in <span className="font-bold text-gray-800">"{category}"</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;