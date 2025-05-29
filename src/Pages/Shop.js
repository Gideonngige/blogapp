import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(''); // For Paystack email
  const publicKey = 'pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f'; // Replace with your Paystack Public Key
  const [selectedProduct, setSelectedProduct] = useState(null);

  // function for paying for the product
  const payProduct = async(product_id, product_name, price) =>{
    const user_id = localStorage.getItem('user_id');
    const quantity = 1;

    if (!user_id) {
      alert("Please sign in to buy a product.");
      return;
    }
    try {
          const response = await axios.post(
            'https://myblogbackend-phgi.onrender.com/create_product_order/',
            {product_id, user_id, product_name, quantity, price },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            console.log("Order placed successfully:", response.data);
            alert("Order placed successfully!");
          } else {
            throw new Error(response.data.message || "Failed to send message");
          }
        } catch (error) {
          console.error("Error ordering product:", error);
          alert("Failed to order product. Please try again later.");
        }

  }
  // end

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        setEmail(email);
      }
      try {
        const res = await axios.get('https://myblogbackend-phgi.onrender.com/get_products/');
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const componentProps = selectedProduct
    ? {
        email: email, // Ideally get this from logged in user
        amount: selectedProduct.price * 100, // Paystack accepts kobo (so multiply by 100)
        metadata: {
          product_name: selectedProduct.name,
        },
        publicKey,
        currency: 'KES', // Kenyan Shilling
        text: 'Pay Now',
        onSuccess: () =>payProduct(selectedProduct.id,selectedProduct.name,selectedProduct.price),
          // alert(`Payment for ${selectedProduct.name} successful!`),
        onClose: () => alert('Payment cancelled.'),
      }
    : {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">G-Tech Shop</h2>

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
              onClick={() => setSelectedProduct(product)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-8">
          <PaystackButton {...componentProps} />
        </div>
      )}
    </div>
  );
};

export default Shop;
