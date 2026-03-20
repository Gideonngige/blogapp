import DashboardLayout from "./Components/Invoice/Dashboard";
export default function Invoices() {
  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl font-bold">All Invoices</h1>
      <p>Here you will display saved invoices from backend.</p>
    </div>
    </DashboardLayout>
  );
}