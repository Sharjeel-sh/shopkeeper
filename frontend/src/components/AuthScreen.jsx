import { useState } from "react";
import { apiFetch } from "../lib/api";

function AuthScreen({ t, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { phone: form.phone, password: form.password }
          : { name: form.name, phone: form.phone, password: form.password };

      const data = await apiFetch(path, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-sm rounded-2xl bg-white p-5 shadow">
      <h1 className="mb-4 text-center text-2xl font-bold">{t.appName}</h1>
      <div className="mb-4 flex gap-2">
        <button
          className={`w-1/2 rounded-xl p-3 text-base font-semibold ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-slate-100"
          }`}
          onClick={() => setMode("login")}
        >
          {t.login}
        </button>
        <button
          className={`w-1/2 rounded-xl p-3 text-base font-semibold ${
            mode === "register" ? "bg-blue-600 text-white" : "bg-slate-100"
          }`}
          onClick={() => setMode("register")}
        >
          {t.register}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" && (
          <input
            className="w-full rounded-xl border p-3 text-base"
            placeholder={t.name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          className="w-full rounded-xl border p-3 text-base"
          placeholder={t.phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="password"
          className="w-full rounded-xl border p-3 text-base"
          placeholder={t.password}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-xl bg-green-600 p-3 text-base font-semibold text-white">
          {mode === "login" ? t.login : t.register}
        </button>
      </form>
    </div>
  );
}

export default AuthScreen;
