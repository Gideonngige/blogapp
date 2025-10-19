import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeliveryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
    const email = localStorage.getItem('email');
    if(email === "deliveryperson@gmail.com"){
        try {
        const res = await axios.get('https://myblogbackend-phgi.onrender.com/get_all_orders/'); // Replace with actual endpoint
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders.');
        setLoading(false);
      }

    }
    else{
        setError('You are not authorized to view this page.');
        setLoading(false);
    }
      
    };

    fetchOrders();
  }, []);

  // Mark order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      await axios.get(`https://myblogbackend-phgi.onrender.com/confirm_order/${orderId}/`); // Replace with your endpoint
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, delivered: true } : order
        )
      );
      alert('Order marked as delivered.');
    } catch (err) {
      console.error(err);
      alert('Failed to update delivery status.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">All Orders (Delivery Dashboard)</h2>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {orders.length === 0 && !loading && (
        <p className="text-gray-600">No orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{order.product_name}</h3>
              <p className="text-gray-600">Customer: {order.user_name}</p>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-600">
                Price: KES {Number(order.price).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            {order.delivered ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium">
                Delivered
              </span>
            ) : (
              <button
                onClick={() => markAsDelivered(order.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOrders;
