import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [messages, setMessages] = useState([]);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (email !== "admin@gtech.com") {
      navigate('/'); // or navigate('/login') if you want to go to login page
    }
  }, [email, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://myblogbackend-phgi.onrender.com/get_dashboard_data/');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // function to fetch messages 
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading2(true);
      try {
        const response = await axios.get('https://myblogbackend-phgi.onrender.com/get_messages/');
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading2(false);
      }
    };

    fetchMessages();
  }, []);
  // end of function to fetch messages

  if (loading) return <p className="text-center text-gray-500">Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Users" value={stats.total_users} />
        <StatCard title="Blog Posts" value={stats.total_blog_posts} />
        <StatCard title="Orders" value={stats.total_orders} />
        <StatCard title="Products" value={stats.total_products} />
        <StatCard title="Notifications" value={stats.total_notifications} />
        <StatCard title="User Feedbacks" value={stats.total_messages} />
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Daily Sales (KES)" value={stats.daily_sales} />
        <StatCard title="Weekly Sales (KES)" value={stats.weekly_sales} />
        <StatCard title="Monthly Sales (KES)" value={stats.monthly_sales} />
        <StatCard title="Yearly Sales (KES)" value={stats.yearly_sales} />
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Daily', amount: parseFloat(stats.daily_sales) },
            { name: 'Weekly', amount: parseFloat(stats.weekly_sales) },
            { name: 'Monthly', amount: parseFloat(stats.monthly_sales) },
            { name: 'Yearly', amount: parseFloat(stats.yearly_sales) },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <button
          onClick={() => window.location.href = '/products'}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Products
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-4">User Messages</h2>
      {messages.map((item, index) => (
        <div key={index} className="p-4 mb-3 border rounded shadow">
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-gray-700">{item.message}</p>
          <small className="text-gray-500">
            {new Date(item.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
