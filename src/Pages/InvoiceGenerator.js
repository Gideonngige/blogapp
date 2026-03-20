import React, { useState, useRef } from "react";
import DashboardLayout from "./Components/Invoice/Dashboard";

export default function InvoiceGenerator() {
  const invoiceRef = useRef();
  const [isOpen, setIsOpen] = useState(true);

  const [form, setForm] = useState({
    businessName: "",
    clientName: "",
    items: [{ description: "", amount: "" }],
    date: "",
    paymentMethod: "mpesa",
    tillNumber: "",
    phoneNumber: "",
    bankName: "",
    accountNumber: "",
    logo: null,
  });

  const [invoice, setInvoice] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...form.items];
    newItems[index][e.target.name] = e.target.value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { description: "", amount: "" }] });
  };

  const handleLogoUpload = (e) => {
    setForm({ ...form, logo: URL.createObjectURL(e.target.files[0]) });
  };

  const generateInvoice = () => {
    setInvoice({ ...form, invoiceNumber: Math.floor(Math.random() * 100000) });
  };

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=700");

    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            .container { max-width: 700px; margin: auto; }
            .logo { width: 120px; height: 120px; object-fit: contain; display: block; margin: 0 auto 10px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; text-align: left; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <div class="container">${printContents}</div>
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  };

  return (
    <DashboardLayout>
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="businessName" placeholder="Business Name" className="border p-2 rounded" onChange={handleChange} />
            <input type="text" name="clientName" placeholder="Client Name" className="border p-2 rounded" onChange={handleChange} />
            <input type="date" name="date" className="border p-2 rounded" onChange={handleChange} />

            <select name="paymentMethod" className="border p-2 rounded" onChange={handleChange} value={form.paymentMethod}>
              <option value="mpesa">M-Pesa</option>
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
            </select>

            {form.paymentMethod === "mpesa" && (
              <>
                <input type="text" name="tillNumber" placeholder="Till Number" className="border p-2 rounded" onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" className="border p-2 rounded" onChange={handleChange} />
              </>
            )}

            {form.paymentMethod === "bank" && (
              <>
                <input type="text" name="bankName" placeholder="Bank Name" className="border p-2 rounded" onChange={handleChange} />
                <input type="text" name="accountNumber" placeholder="Account Number" className="border p-2 rounded" onChange={handleChange} />
              </>
            )}

            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>

          {form.items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mt-2">
              <input type="text" name="description" placeholder="Item Description" value={item.description} onChange={(e) => handleItemChange(index, e)} className="border p-2 rounded" />
              <input type="number" step="0.01" name="amount" placeholder="Amount (KES)" value={item.amount} onChange={(e) => handleItemChange(index, e)} className="border p-2 rounded" />
            </div>
          ))}

          <button onClick={addItem} className="mt-2 bg-gray-300 px-3 py-1 rounded">Add Item</button>
          <button onClick={generateInvoice} className="mt-4 bg-black text-white px-4 py-2 rounded">Generate Invoice</button>

          {invoice && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Invoice Preview</h2>

              <div ref={invoiceRef} className="bg-white p-8">
                <div className="text-center mb-6">
                  {invoice.logo && (
                    <img src={invoice.logo} alt="Logo" className="mx-auto mb-2" style={{ width: "120px", height: "120px", objectFit: "contain" }} />
                  )}
                  <h2 className="text-2xl font-bold">{invoice.businessName}</h2>
                  <p className="text-gray-500">Invoice</p>
                </div>

                <div className="flex justify-between mb-6 text-sm">
                  <div>
                    <p><strong>Bill To:</strong></p>
                    <p>{invoice.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                    <p><strong>Date:</strong> {invoice.date}</p>
                  </div>
                </div>

                <table className="w-full border-t border-b">
                  <thead>
                    <tr>
                      <th className="py-2 text-left">Description</th>
                      <th className="py-2 text-right">Amount (KES)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2">{item.description}</td>
                        <td className="py-2 text-right">{Number(item.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right mt-4">
                  <p className="text-lg font-bold">
                    Total: KES {invoice.items.reduce((sum, i) => sum + Number(i.amount || 0), 0).toFixed(2)}
                  </p>
                </div>

                <div className="text-sm mt-6">
                  <p><strong>Payment Method:</strong> {invoice.paymentMethod}</p>
                </div>
              </div>

              <button onClick={handlePrint} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Download / Print Invoice</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}