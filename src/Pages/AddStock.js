import React, { useEffect, useState } from 'react';

const AddStock = () => {
  const [products, setProducts] = useState([]);
  const [stockToAdd, setStockToAdd] = useState({});
  const [message, setMessage] = useState('');

  
  const email = localStorage.getItem('email');
  useEffect(() => {
    // Fetch products from your API
    const email = localStorage.getItem('email');
    if(email === "admin@gtech.com"){
    fetch('https://myblogbackend-phgi.onrender.com/get_products/') // Replace with actual endpoint
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Error fetching products:', err));
    }
    else{
      setMessage('You are not authorized to view this page.');
    }
  }, []);

  const handleInputChange = (productId, value) => {
    setStockToAdd((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddStock = async (productId) => {
    const additionalStock = parseInt(stockToAdd[productId]);
    if (isNaN(additionalStock) || additionalStock < 0) {
      setMessage('Please enter a valid, non-negative stock value.');
      return;
    }

    try {
      const response = await fetch(
        `https://myblogbackend-phgi.onrender.com/add_stock/${productId}/${additionalStock}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(`Stock updated for Product ID ${productId}: new stock = ${data.new_stock}`);
        // Refresh the products list
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stock: data.new_stock } : p
          )
        );
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Failed to update stock. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Stock to Products</h1>
      {message && (
        <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
      )}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Current Stock</th>
            <th className="p-2 border">Add Stock</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.stock}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  min="0"
                  value={stockToAdd[product.id] || ''}
                  onChange={(e) => handleInputChange(product.id, e.target.value)}
                  className="border p-1 w-20"
                />
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleAddStock(product.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Update Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStock;
