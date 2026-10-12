export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Results</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Performance overview</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Average score</div>
            <div className="mt-2 text-3xl font-black text-primary">72%</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Best score</div>
            <div className="mt-2 text-3xl font-black text-primary">89%</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm text-slate-500">Accuracy</div>
            <div className="mt-2 text-3xl font-black text-primary">76%</div>
          </div>
        </div>
      </div>
    </main>
  );
}
