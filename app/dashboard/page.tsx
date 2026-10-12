"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  user: {
    fullName: string;
    email: string;
  };
  stats: {
    totalPracticeSessions: number;
    mockExamsCompleted: number;
    averageScore: string;
    bestScore: string;
    recentExams: Array<{ title: string; score: string; date: string }>;
  };
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("utme-auth-token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.error) {
          window.location.href = "/login";
          return;
        }
        setData(payload);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center">Loading dashboard...</main>;
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Student dashboard</div>
            <h1 className="mt-2 text-3xl font-black">Welcome back, {data.user.fullName}</h1>
          </div>
          <button onClick={() => { localStorage.removeItem("utme-auth-token"); window.location.href = "/login"; }} className="rounded-xl bg-primary px-4 py-2.5 text-white font-semibold">
            Logout
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Total practice sessions</div><div className="mt-3 text-3xl font-black text-primary">{data.stats.totalPracticeSessions}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Mock exams completed</div><div className="mt-3 text-3xl font-black text-primary">{data.stats.mockExamsCompleted}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Average score</div><div className="mt-3 text-3xl font-black text-primary">{data.stats.averageScore}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Best score</div><div className="mt-3 text-3xl font-black text-primary">{data.stats.bestScore}</div></div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold">Recent examination history</h2>
          <div className="mt-5 space-y-4">
            {data.stats.recentExams.map((exam) => (
              <div key={exam.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="font-semibold text-slate-900">{exam.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{exam.date}</div>
                </div>
                <div className="font-bold text-primary">{exam.score}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
