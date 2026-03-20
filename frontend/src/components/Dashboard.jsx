function StatCard({ title, value, tone = "slate" }) {
  const tones = {
    red: "from-red-50 to-white border-red-100",
    green: "from-green-50 to-white border-green-100",
    blue: "from-blue-50 to-white border-blue-100",
    slate: "from-slate-50 to-white border-slate-100"
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-b p-4 shadow-sm ${tones[tone]}`}>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">Rs. {value}</p>
    </div>
  );
}

function Dashboard({ t, data, onCustomerSelect }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <StatCard title={t.totalUdhaar} value={data.totalUdhaarGiven || 0} tone="red" />
        <StatCard title={t.totalReceived} value={data.totalReceived || 0} tone="green" />
        <StatCard title={t.remaining} value={data.remainingBalance || 0} tone="blue" />
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-3 text-lg font-bold">{t.pendingCustomers}</h2>
        {(data.customerPending || []).length === 0 ? (
          <p className="text-slate-500">{t.noPendingCustomers}</p>
        ) : (
          <div className="space-y-2">
            {data.customerPending.map((c) => (
              <button
                key={c._id}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-left active:scale-[0.99]"
                onClick={() => onCustomerSelect(c._id)}
              >
                <span className="font-medium">{c.name}</span>
                <span className="font-semibold text-red-600">Rs. {c.pendingAmount}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
