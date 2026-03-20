import { useState } from "react";

function FormCard({ title, children }) {
  return (
    <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}

export function AddCustomerForm({ t, onSubmit, loading }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, phone });
    setName("");
    setPhone("");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <FormCard title={t.addCustomer}>
      <input
        className="w-full rounded-xl border p-3 text-base"
        placeholder={t.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        required
      />
      <input
        className="w-full rounded-xl border p-3 text-base"
        placeholder={t.phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
      />
      <button disabled={loading} className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white disabled:opacity-60">
        {loading ? t.loading : t.save}
      </button>
      </FormCard>
    </form>
  );
}

export function AddUdhaarForm({ t, customers, onSubmit, loading }) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const submit = async (e) => {
    e.preventDefault();
    await onSubmit({ customerId, amount: Number(amount), note, date });
    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <FormCard title={t.addUdhaar}>
      <select
        className="w-full rounded-xl border p-3 text-base"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        disabled={loading}
        required
      >
        <option value="">-- {t.customer} --</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="w-full rounded-xl border p-3 text-base"
        placeholder={t.amount}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        required
      />
      <input
        className="w-full rounded-xl border p-3 text-base"
        placeholder={t.note}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={loading}
      />
      <input
        type="date"
        className="w-full rounded-xl border p-3 text-base"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={loading}
      />
      <button disabled={loading} className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white disabled:opacity-60">
        {loading ? t.loading : t.save}
      </button>
      </FormCard>
    </form>
  );
}

export function AddPaymentForm({ t, customers, onSubmit, loading }) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await onSubmit({ customerId, amount: Number(amount) });
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <FormCard title={t.addPayment}>
      <select
        className="w-full rounded-xl border p-3 text-base"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        disabled={loading}
        required
      >
        <option value="">-- {t.customer} --</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="w-full rounded-xl border p-3 text-base"
        placeholder={t.amount}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
        required
      />
      <button disabled={loading} className="w-full rounded-xl bg-green-600 p-3 font-semibold text-white disabled:opacity-60">
        {loading ? t.loading : t.save}
      </button>
      </FormCard>
    </form>
  );
}
