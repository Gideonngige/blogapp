import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchProducts = async () => {
      if (email === 'admin@gtech.com') {
        try {
          const res = await fetch('https://myblogbackend-phgi.onrender.com/get_products/');
          const data = await res.json();
          setProducts(data.products);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to load products.');
        }
      } else {
        setError('You are not authorized to view this page.');
      }
    };

    fetchProducts();
  }, [email]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleAddStock = () => {
    navigate('/add-stock');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {error && <p className="text-red-600">{error}</p>}

      {!error && (
        <>
          <button
            onClick={handleAddProduct}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>

          {products.length === 0 ? (
            <p className="text-gray-600">No products available.</p>
          ) : (
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="text-center">
                    <td className="border p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover mx-auto"
                      />
                    </td>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">KES {product.price}</td>
                    <td className="border p-2">{product.stock}</td>
                    <td className="border p-2">
                      <button
                        onClick={handleAddStock}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Add Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
