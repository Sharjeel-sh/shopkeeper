function CustomerDetails({ t, details, onBack }) {
  if (!details) return null;

  return (
    <div className="space-y-3 pb-20">
      <button onClick={onBack} className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold active:scale-[0.99]">
        {t.back}
      </button>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-xl font-bold">{details.customer.name}</h2>
        <p className="text-slate-600">{details.customer.phone || "-"}</p>
        <p className="mt-2 text-lg font-semibold">
          {t.runningBalance}: Rs. {details.runningBalance}
        </p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">
            {t.sendWhatsApp}
          </button>
          <button className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
            {t.sendSMS}
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h3 className="mb-2 text-lg font-bold">{t.allTransactions}</h3>
        <div className="space-y-2">
          {details.transactions.map((tx) => (
            <div key={tx._id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{tx.type}</p>
                <p className={tx.type === "UDHAAR" ? "text-red-600" : "text-green-600"}>
                  Rs. {tx.amount}
                </p>
              </div>
              <p className="text-sm text-slate-600">{new Date(tx.date).toLocaleDateString()}</p>
              {tx.note ? <p className="text-sm">{tx.note}</p> : null}
              <p className="text-sm font-medium">Balance: Rs. {tx.runningBalance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
