import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../component/ProductCard';

const Products = () => {
  const { products, searchQuery } = useContext(AppContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16">
      <h1 className="text-3xl lg:text-4xl font-medium">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {filteredProducts
          ?.filter((product) => product.inStock)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;