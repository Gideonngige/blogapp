// 📁 src/components/Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-blue-700 text-white p-4 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 bg-blue-900 px-3 py-1 rounded w-full"
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Title */}
      {isOpen && (
        <h2 className="text-xl font-bold mb-6 text-center">Dashboard</h2>
      )}

      {/* Nav Items */}
      <ul className="space-y-2">
        <li
          onClick={() => navigate("/invoice-generator")}
          className={`cursor-pointer px-3 py-2 rounded transition ${
            isActive("/invoice-generator")
              ? "bg-blue-900"
              : "hover:bg-blue-800"
          }`}
        >
          {isOpen && "Create Invoice"}
        </li>

        <li
          onClick={() => navigate("/invoices")}
          className={`cursor-pointer px-3 py-2 rounded transition ${
            isActive("/invoices")
              ? "bg-blue-900"
              : "hover:bg-blue-800"
          }`}
        >
          {isOpen && "Invoices"}
        </li>

        <li
          onClick={() => navigate("/payments")}
          className={`cursor-pointer px-3 py-2 rounded transition ${
            isActive("/payments")
              ? "bg-blue-900"
              : "hover:bg-blue-800"
          }`}
        >
          {isOpen && "Payments"}
        </li>

        <li
          onClick={() => navigate("/subscriptions")}
          className={`cursor-pointer px-3 py-2 rounded transition ${
            isActive("/subscriptions")
              ? "bg-blue-900"
              : "hover:bg-blue-800"
          }`}
        >
          {isOpen && "Subscriptions"}
        </li>

        <li
          onClick={() => navigate("/plans")}
          className={`cursor-pointer px-3 py-2 rounded transition ${
            isActive("/plans")
              ? "bg-blue-900"
              : "hover:bg-blue-800"
          }`}
        >
          {isOpen && "Plans"}
        </li>
      </ul>
    </div>
  );
}