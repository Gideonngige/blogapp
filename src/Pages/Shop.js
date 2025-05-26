import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://myblogbackend-phgi.onrender.com/get_products/'); // Replace with your actual endpoint
        setProducts(res.data.products); // assuming response has `products` key
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    alert(`You clicked to buy ${product.name} for KES ${product.price}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Accessories Shop</h2>

      {loading && <p className="text-gray-600">Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-blue-600 font-bold mt-2">
              KES {Number(product.price).toLocaleString()}
            </p>
            <button
              onClick={() => handleBuyNow(product)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
