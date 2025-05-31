import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
