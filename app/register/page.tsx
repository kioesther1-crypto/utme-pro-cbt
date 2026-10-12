import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Phone, UserRound, LockKeyhole } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="bg-slate-950 px-8 py-10 text-white lg:px-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-8">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Create account</div>
              <h1 className="mt-3 text-3xl font-black leading-tight">Start preparing for a better UTME result</h1>
              <p className="mt-4 text-slate-300 leading-7">Build your study routine, master subject combinations, and track your performance with every mock exam.</p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Free student account",
                "Subject-based revision support",
                "Access practice and mock exams",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Register</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Create your student profile</h2>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <input type="text" placeholder="Adaeze Okafor" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input type="email" placeholder="your@email.com" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <input type="tel" placeholder="0803 000 0000" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                    <LockKeyhole className="h-4 w-4 text-slate-400" />
                    <input type="password" placeholder="Choose a password" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                    <LockKeyhole className="h-4 w-4 text-slate-400" />
                    <input type="password" placeholder="Confirm password" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3.5 font-semibold text-white shadow-soft hover:bg-primary/90">
                Create Free Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <Link href="/login" className="font-semibold text-primary">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
