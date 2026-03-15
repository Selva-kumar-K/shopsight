export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-1">Dashboard</h1>
      <p className="text-sm text-gray-400 mb-6">Welcome back, Admin</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: "$48,295", change: "+12.5%" },
          { label: "Total Orders", value: "1,284", change: "+8.2%" },
          { label: "Total Products", value: "342", change: "+3.1%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <p className="text-sm text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <p className="text-xs text-green-400 font-medium mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <p className="text-sm font-medium text-gray-400">Recent activity will appear here.</p>
      </div>
    </div>
  );
}
