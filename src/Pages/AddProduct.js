import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './Config/Env';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const categories = [
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Phones', label: 'Phones' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Watches', label: 'Watches' },
    { value: 'TVs', label: 'TVs' },
    { value: 'Radios', label: 'Radios' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    const role = localStorage.getItem('role');
    if(role === "admin"){
      setIsAdding(true);
    try {
      const res = await axios.post(`${API_URL}/add_product/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Product added successfully!');
      setError('');
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: null,
      });
    } catch (err) {
      setError('Failed to add product. Check console for details.');
      setSuccess('');
      console.error(err);
    }
    finally {
      setIsAdding(false);
    }
  }
  else{
    setError('You do not have permission to add products.');
    setSuccess('');
  }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Accessory Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-2 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">--Select Category--</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          className="w-full border p-2 rounded"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isAdding ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
