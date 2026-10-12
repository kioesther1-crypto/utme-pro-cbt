import Link from "next/link";
import { ArrowRight, BookOpenText, CheckCircle2, Clock3, ChevronRight, FileText, GraduationCap, ShieldCheck, Star, TrendingUp } from "lucide-react";

const stats = [
  { label: "Registered students", value: "18,420" },
  { label: "Practice questions", value: "12,500+" },
  { label: "Completed mock exams", value: "6,840" },
];

const features = [
  {
    icon: Clock3,
    title: "Timed CBT Practice",
    description: "Train under realistic exam pressure with countdown timers and timed subject sessions.",
  },
  {
    icon: CheckCircle2,
    title: "Instant Results",
    description: "Get immediate feedback, score breakdowns, and explanations to improve faster.",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor your progress with trend lines, weak topic analysis, and targeted revision insights.",
  },
  {
    icon: BookOpenText,
    title: "Subject-Specific Revision",
    description: "Focus on the exact areas you need most, from Use of English to the sciences and arts.",
  },
];

const howItWorks = [
  "Create a free account and set your UTME subject combination.",
  "Practice topic-based questions and timed mock tests.",
  "Review explanations and track your progress weekly.",
  "Improve accuracy, speed, and confidence before the exam.",
];

const faqs = [
  {
    question: "Is UTME Pro CBT suitable for JAMB preparation?",
    answer: "Yes. The platform is designed specifically for JAMB UTME revision, mock exam simulation, and performance tracking.",
  },
  {
    question: "Can I practice by subject?",
    answer: "Absolutely. Students can revise by subject and also choose their four compulsory UTME subjects.",
  },
  {
    question: "Do you offer mock exams?",
    answer: "Yes. Mock examinations are available and built to mirror the CBT environment and timing structure.",
  },
  {
    question: "Is my data secure?",
    answer: "Student data is protected with secure password handling, role-based access, and modern platform standards.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">U</div>
              <div>
                <div className="text-lg font-extrabold text-primary">UTME Pro CBT</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Practice Smarter</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How it works</Link>
              <Link href="#faq">FAQ</Link>
              <Link href="/subjects">Subjects</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-primary">Log in</Link>
              <Link href="/register" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-semibold shadow-soft">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primarySoft px-3 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Trusted JAMB preparation platform
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
              Your Journey to a Higher JAMB Score Starts Here.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600 leading-8">
              Practice smarter, build speed, and improve confidence with realistic UTME computer-based test sessions, detailed performance tracking, and subject-focused revision.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/subjects" className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-xl px-6 py-3.5 font-semibold shadow-soft">
                Start Practising
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/exam" className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-800 rounded-xl px-6 py-3.5 font-semibold shadow-sm">
                Take a Mock Exam
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Realistic CBT format
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Instant feedback
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Smart revision guidance
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white shadow-soft p-5">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase text-slate-400">Mock Exam</div>
                    <div className="mt-2 text-2xl font-bold">UTME Trial</div>
                  </div>
                  <div className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">Live</div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Subject</span>
                    <span className="font-semibold">Use of English</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Questions</span>
                    <span className="font-semibold">60</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Time Left</span>
                    <span className="font-semibold text-amber-300">00:42:17</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-black text-primary">{stat.value}</div>
                    <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Why students choose us</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-950">A modern preparation platform built for exam success</h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="inline-flex rounded-xl bg-primarySoft p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600 leading-7">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-950">Built to help you improve with clarity and confidence</h2>
            <p className="mt-5 text-slate-600 leading-8">
              Every feature on the platform is designed to reduce wasted effort and help you focus on your weak areas while accelerating your strengths.
            </p>
          </div>

          <div className="grid gap-4">
            {howItWorks.map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</div>
                <p className="pt-2 text-slate-700 text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">FAQ</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black">Frequently asked questions</h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6">
                <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                <p className="mt-3 text-slate-300 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold">U</div>
                <div>
                  <div className="text-base font-extrabold text-primary">UTME Pro CBT</div>
                </div>
              </div>
              <p className="mt-4 text-slate-600 leading-7">Practice Smarter. Prepare Better. Score Higher.</p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Company</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Legal</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Use</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Contact</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>Email: support@utmeprocbt.com</li>
                <li>Phone: +234 800 000 0000</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            © 2026 UTME Pro CBT. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
