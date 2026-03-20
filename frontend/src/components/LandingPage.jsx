function FeatureCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
    </div>
  );
}

function TestimonialCard({ text, name }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm text-slate-700">"{text}"</p>
      <p className="mt-2 text-xs font-semibold text-slate-500">{name}</p>
    </div>
  );
}

function LandingPage({ t, onStartFree }) {
  return (
    <div className="space-y-5 pb-6">
      <header className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
          UT
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t.appName}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.landingTagline}</p>
        <button
          onClick={onStartFree}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
        >
          {t.startFree}
        </button>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">{t.featuresTitle}</h2>
        <FeatureCard title={t.featureAddCustomer} subtitle={t.featureAddCustomerSub} />
        <FeatureCard title={t.featureTrackUdhaar} subtitle={t.featureTrackUdhaarSub} />
        <FeatureCard title={t.featureRecordPayments} subtitle={t.featureRecordPaymentsSub} />
        <FeatureCard title={t.featureSummaryDashboard} subtitle={t.featureSummaryDashboardSub} />
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-slate-900">{t.appPreview}</h2>
        <div className="mt-3 mx-auto w-52 rounded-[28px] bg-slate-900 p-2 shadow-lg">
          <div className="h-80 rounded-[22px] bg-gradient-to-b from-slate-100 to-slate-200 p-3">
            <div className="mb-3 h-3 w-16 rounded-full bg-slate-300" />
            <div className="space-y-2">
              <div className="h-12 rounded-xl bg-white shadow-sm" />
              <div className="h-12 rounded-xl bg-white shadow-sm" />
              <div className="h-12 rounded-xl bg-white shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">{t.trustTitle}</h2>
        <TestimonialCard text={t.testimonial1} name={t.testimonial1By} />
        <TestimonialCard text={t.testimonial2} name={t.testimonial2By} />
        <TestimonialCard text={t.testimonial3} name={t.testimonial3By} />
      </section>

      <footer className="rounded-2xl bg-white p-4 text-center text-xs text-slate-500 shadow-sm ring-1 ring-slate-100">
        <p>{t.footerContact}</p>
        <p className="mt-1">{t.footerLinks}</p>
        <p className="mt-2">© {new Date().getFullYear()} Udhaar Tracker</p>
      </footer>
    </div>
  );
}

export default LandingPage;
