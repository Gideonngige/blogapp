import React, { useEffect, useState } from 'react';
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

const AddStock = () => {
  const [products, setProducts] = useState([]);
  const [stockToAdd, setStockToAdd] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch products from your API
    const role = localStorage.getItem('role');
    if(role === "admin"){
    fetch(`${API_URL}/get_products/`) // Replace with actual endpoint
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Error fetching products:', err));
    }
    else{
      setMessage('You are not authorized to view this page.');
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You are not authorized to view this page.',
      });
    }
  }, []);

  const handleInputChange = (productId, value) => {
    setStockToAdd((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddStock = async (e, productId) => {
    e.preventDefault();
    const additionalStock = parseInt(stockToAdd[productId]);
    if (isNaN(additionalStock) || additionalStock < 0) {
      setMessage('Please enter a valid, non-negative stock value.');
      // use sweetalert2 to show warning
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please enter a valid, non-negative stock value.',
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/add_stock/${productId}/${additionalStock}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(`Stock updated for Product ID ${productId}: new stock = ${data.new_stock}`);
        // use sweetalert2 to show success
        Swal.fire({
          icon: 'success',
          title: 'Stock Updated',
          text: `Stock updated for Product ID ${productId}: new stock = ${data.new_stock}`,
        });
        setStockToAdd({});
        // Refresh the products list
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stock: data.new_stock } : p
          )
        );
      } else {
        setMessage(`Error: ${data.message}`);
        // use sweetalert2 to show error
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'There was an error updating the stock. Please try again later.',
        });
      }
    } catch (error) {
      setMessage('Failed to update stock. Please try again.');
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error updating the stock. Please try again later.',
      });
      console.error('Error updating stock:', error);
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
                  onClick={(e) => handleAddStock(e,product.id)}
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
