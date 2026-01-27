import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stockData = [
  { date: "Jan", price: 50 },
  { date: "Feb", price: 65 },
  { date: "Mar", price: 80 },
  { date: "Apr", price: 95 },
  { date: "May", price: 120 },
];

export default function Stock() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">NEXINDI Shares</h2>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-lg">
          Current Price: <b>KES 120</b>
        </p>
        <p className="text-sm text-gray-500">
          Market trend over time
        </p>

        <div className="w-full h-64 mt-4">
          <ResponsiveContainer>
            <LineChart data={stockData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Buy Shares */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Buy Shares</h3>
        <input
          type="number"
          placeholder="Enter number of shares"
          className="border p-3 rounded w-full mb-4"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
          Invest Now
        </button>
      </div>
    </div>
  );
}
