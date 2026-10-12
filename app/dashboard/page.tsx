import Link from "next/link";
import { ArrowUpRight, BookOpenText, BarChart3, Clock3, FileText, MessageSquareText, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total practice sessions", value: "34" },
  { label: "Mock exams completed", value: "7" },
  { label: "Average score", value: "72%" },
  { label: "Best score", value: "89%" },
];

const history = [
  { title: "Mock Exam: Physics & Chemistry", score: "84%", date: "12 Sept 2026", status: "Excellent" },
  { title: "Use of English Revision", score: "74%", date: "08 Sept 2026", status: "Good" },
  { title: "Mathematics Drill", score: "68%", date: "04 Sept 2026", status: "Improving" },
];

const topicBreakdown = [
  { label: "English Language", correct: 18, incorrect: 6 },
  { label: "Mathematics", correct: 16, incorrect: 8 },
  { label: "Physics", correct: 12, incorrect: 9 },
  { label: "Biology", correct: 14, incorrect: 7 },
];

const weakTopics = ["Probability & Statistics", "Modern Physics", "Sentence Completion", "Organic Chemistry"]; 

const quickActions = [
  { label: "Practice Questions", icon: BookOpenText },
  { label: "Mock Examination", icon: Clock3 },
  { label: "Past Questions", icon: FileText },
  { label: "Results", icon: BarChart3 },
  { label: "Study History", icon: MessageSquareText },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Student dashboard</div>
            <h1 className="mt-2 text-3xl font-black">Welcome back, Adaeze</h1>
          </div>
          <Link href="/subjects" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-white font-semibold shadow-soft">
            Update subject combo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="mt-3 text-3xl font-black text-primary">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid xl:grid-cols-[1.25fr_0.75fr] gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent examination history</h2>
              <Link href="/results" className="text-sm font-semibold text-primary">View all</Link>
            </div>

            <div className="mt-5 space-y-4">
              {history.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{item.score}</div>
                    <div className="text-xs text-success">{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">Quick access</h2>
            <div className="mt-5 grid gap-3">
              {quickActions.map(({ label, icon: Icon }) => (
                <Link key={label} href="/exam" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-primary/40 hover:bg-primarySoft">
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">Subject performance breakdown</h2>
            <div className="mt-6 space-y-5">
              {topicBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span>{item.correct}/{item.correct + item.incorrect} correct</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(item.correct / (item.correct + item.incorrect)) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold">Weak topics to revisit</h2>
            <div className="mt-5 space-y-3">
              {weakTopics.map((topic) => (
                <div key={topic} className="flex items-center justify-between rounded-xl border border-danger/20 bg-dangerSoft px-4 py-3 text-sm font-medium text-slate-800">
                  <span>{topic}</span>
                  <Target className="h-4 w-4 text-danger" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Performance over time</h2>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>

          <div className="mt-6 h-56 rounded-2xl bg-gradient-to-r from-primary/10 via-sky-50 to-success/10 p-4">
            <div className="flex h-full items-end gap-3">
              {[45, 52, 61, 58, 76, 82, 84].map((value, index) => (
                <div key={value + index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-primary to-primary/60" style={{ height: `${value}%` }} />
                  <span className="text-xs text-slate-500">W{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
