import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "./lib/api";
import { labels } from "./lib/i18n";
import AuthScreen from "./components/AuthScreen";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import CustomerDetails from "./components/CustomerDetails";
import { AddCustomerForm, AddPaymentForm, AddUdhaarForm } from "./components/Forms";

function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [dashboard, setDashboard] = useState({});
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [error, setError] = useState("");
  const [loadingMain, setLoadingMain] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [showAuth, setShowAuth] = useState(false);

  const t = useMemo(() => labels[lang], [lang]);
  const desktopShellClass = "min-h-screen w-full bg-slate-100 md:bg-slate-200 md:p-6";
  const mobileFrameClass =
    "mx-auto w-full max-w-md min-h-screen bg-slate-100 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-[28px] md:shadow-2xl md:ring-1 md:ring-slate-200";

  const loadMainData = async () => {
    try {
      setLoadingMain(true);
      setError("");
      const [dashboardData, customerData] = await Promise.all([
        apiFetch("/dashboard"),
        apiFetch("/customers")
      ]);
      setDashboard(dashboardData);
      setCustomers(customerData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMain(false);
    }
  };

  useEffect(() => {
    if (user) loadMainData();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSelectedCustomerDetails(null);
  };

  const addCustomer = async (payload) => {
    try {
      setActionLoading("customer");
      setError("");
      await apiFetch("/customers", { method: "POST", body: JSON.stringify(payload) });
      await loadMainData();
      setActiveTab("home");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const addUdhaar = async (payload) => {
    try {
      setActionLoading("udhaar");
      setError("");
      await apiFetch("/transactions/udhaar", { method: "POST", body: JSON.stringify(payload) });
      await loadMainData();
      setActiveTab("home");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const addPayment = async (payload) => {
    try {
      setActionLoading("payment");
      setError("");
      await apiFetch("/transactions/payment", { method: "POST", body: JSON.stringify(payload) });
      await loadMainData();
      setActiveTab("home");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const openCustomerDetail = async (customerId) => {
    try {
      setLoadingDetail(true);
      setError("");
      setSelectedCustomerId(customerId);
      const details = await apiFetch(`/customers/${customerId}`);
      setSelectedCustomerDetails(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  if (!user) {
    return (
      <div className={desktopShellClass}>
        <main className={`${mobileFrameClass} p-4`}>
          <div className="mx-auto mb-2 flex max-w-sm justify-end gap-2">
            <button className="rounded-lg bg-slate-200 px-3 py-2 text-sm" onClick={() => setLang("en")}>
              EN
            </button>
            <button className="rounded-lg bg-slate-200 px-3 py-2 text-sm" onClick={() => setLang("ur")}>
              UR
            </button>
          </div>
          {showAuth ? (
            <>
              <button
                className="mb-2 rounded-lg bg-slate-200 px-3 py-2 text-sm transition hover:bg-slate-300"
                onClick={() => setShowAuth(false)}
              >
                {t.back}
              </button>
              <AuthScreen t={t} onAuthSuccess={setUser} />
            </>
          ) : (
            <LandingPage t={t} onStartFree={() => setShowAuth(true)} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className={desktopShellClass}>
      <main className={`${mobileFrameClass} space-y-4 p-4 pb-24 md:min-h-full`}>
        <header className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">{t.appName}</h1>
            <button className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white" onClick={handleLogout}>
              {t.logout}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-sm text-slate-600">{user.name}</p>
            <button
              className="rounded-lg bg-slate-200 px-3 py-2 text-sm"
              onClick={loadMainData}
              disabled={loadingMain}
            >
              {loadingMain ? t.loading : t.pullToRefresh}
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="rounded-lg bg-slate-200 px-3 py-2 text-sm" onClick={() => setLang("en")}>
              EN
            </button>
            <button className="rounded-lg bg-slate-200 px-3 py-2 text-sm" onClick={() => setLang("ur")}>
              UR
            </button>
          </div>
      </header>

      {error ? (
        <div className="rounded-xl bg-red-100 p-3 text-red-700">
          <p className="text-sm font-semibold">{t.somethingWrong}</p>
          <p className="text-sm">{error}</p>
          <button className="mt-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white" onClick={loadMainData}>
            {t.retry}
          </button>
        </div>
      ) : null}

      {selectedCustomerDetails ? (
        <CustomerDetails
          t={t}
          details={selectedCustomerDetails}
          onBack={() => {
            setSelectedCustomerId("");
            setSelectedCustomerDetails(null);
          }}
        />
      ) : (
        <>
          {loadingMain ? (
            <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-100">
              {t.loading}
            </div>
          ) : null}
          {activeTab === "home" ? <Dashboard t={t} data={dashboard} onCustomerSelect={openCustomerDetail} /> : null}
          {activeTab === "customer" ? (
            <AddCustomerForm t={t} onSubmit={addCustomer} loading={actionLoading === "customer"} />
          ) : null}
          {activeTab === "udhaar" ? (
            <AddUdhaarForm t={t} customers={customers} onSubmit={addUdhaar} loading={actionLoading === "udhaar"} />
          ) : null}
          {activeTab === "payment" ? (
            <AddPaymentForm t={t} customers={customers} onSubmit={addPayment} loading={actionLoading === "payment"} />
          ) : null}
        </>
      )}

      {selectedCustomerId ? (
        <p className="pb-4 text-center text-xs text-slate-400">Customer ID: {selectedCustomerId}</p>
      ) : null}

      {!selectedCustomerDetails ? (
        <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md border-t border-slate-200 bg-white px-2 py-2 md:bottom-6">
          <div className="grid grid-cols-4 gap-2 text-sm">
            <button
              onClick={() => setActiveTab("home")}
              className={`rounded-xl p-3 font-semibold ${activeTab === "home" ? "bg-blue-600 text-white" : "bg-slate-100"}`}
            >
              {t.homeTab}
            </button>
            <button
              onClick={() => setActiveTab("udhaar")}
              className={`rounded-xl p-3 font-semibold ${activeTab === "udhaar" ? "bg-blue-600 text-white" : "bg-slate-100"}`}
            >
              {t.udhaarTab}
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`rounded-xl p-3 font-semibold ${activeTab === "payment" ? "bg-blue-600 text-white" : "bg-slate-100"}`}
            >
              {t.paymentTab}
            </button>
            <button
              onClick={() => setActiveTab("customer")}
              className={`rounded-xl p-3 font-semibold ${activeTab === "customer" ? "bg-blue-600 text-white" : "bg-slate-100"}`}
            >
              {t.customerTab}
            </button>
          </div>
        </nav>
      ) : null}
      {loadingDetail ? (
        <div className="rounded-xl bg-white p-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">{t.loading}</div>
      ) : null}
      </main>
    </div>
  );
}

export default App;
