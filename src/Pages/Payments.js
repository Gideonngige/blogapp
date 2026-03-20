import DashboardLayout from "./Components/Invoice/Dashboard";
export default function Payments() {
  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl font-bold">All Payments</h1>
      <p>Here you will display saved payments from backend.</p>
    </div>
    </DashboardLayout>
  );
}