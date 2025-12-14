import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './Config/Env';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const user_id = localStorage.getItem('user_id');
      try {
        const res = await axios.get(`${API_URL}/get_product_orders/${user_id}/`); // Replace with actual API
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {orders.length === 0 && !loading && (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{order.product_name}</h3>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-600">
                Price: KES {Number(order.price).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                order.delivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {order.delivered ? 'Delivered' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
