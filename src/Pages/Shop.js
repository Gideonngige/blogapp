import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { API_URL } from './Config/Env';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const publicKey = 'pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f';
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paid, setPaid] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [checkoutPaid, setCheckoutPaid] = useState(false);
  const user_id = localStorage.getItem('user_id');

  const payProduct = async (product_id, product_name, price) => {
    if (!user_id) {
      alert("Please sign in to buy a product.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/create_product_order/`,
        { product_id, user_id, product_name, quantity: 1, price },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        console.log("Order placed successfully:", response.data);
        setPaid(true);
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error ordering product:", error);
      alert("Failed to order product. Please try again later.");
    }
  };

  const handleCheckout = async () => {
    if (!user_id) return alert("Please log in to checkout.");
    try {
      await axios.post(
        `${API_URL}/create_bulk_order/`,
        {
          user_id,
          products: cart.map(item => ({
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert("Bulk order placed successfully!");
      setCart([]);
      setCheckoutPaid(false);
    } catch (error) {
      console.error(error);
      alert("Failed to checkout.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const email = localStorage.getItem('email');
      if (email) setEmail(email);
      try {
        const res = await axios.get(`${API_URL}/get_products/`);
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

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const componentProps = selectedProduct
    ? {
        email: email,
        amount: selectedProduct.price * 100,
        metadata: { product_name: selectedProduct.name },
        publicKey,
        currency: 'KES',
        text: 'Pay Now',
        onSuccess: () => payProduct(selectedProduct.id, selectedProduct.name, selectedProduct.price),
        onClose: () => alert('Payment cancelled.'),
      }
    : {};

  const bulkPaystackProps = {
    email: email,
    amount: totalAmount * 100,
    publicKey,
    text: 'Pay for All',
    currency: 'KES',
    metadata: {
      cart: cart.map(item => ({
        product_name: item.name,
        quantity: item.quantity,
      })),
    },
    onSuccess: () => {
      setCheckoutPaid(true);
      handleCheckout();
    },
    onClose: () => alert("Payment cancelled."),
  };

  // Group products by category
  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category || "Others";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col min-h-screen">
      <h2 className="text-3xl font-bold mb-8">G-Tech Shop</h2>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-blue-600 rounded-lg px-4 py-2"
        />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-bold mb-4">{category}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts[category]
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow p-4">
                  <img
                    src={`${API_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                  <p className="text-blue-600 font-bold mt-2">
                    KES {Number(product.price).toLocaleString()}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setPaid(false);
                    }}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}

            {groupedProducts[category].filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      ))}

      {selectedProduct && !paid && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <PaystackButton {...componentProps} />
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg z-50">
          <h4 className="font-bold mb-2">Cart Summary</h4>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} = KES {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="font-semibold mt-2">
            Total: KES {totalAmount}
          </p>
          <PaystackButton {...bulkPaystackProps} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" />
        </div>
      )}
    </div>
  );
};

export default Shop;