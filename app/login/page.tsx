import Link from "next/link";
import { ArrowLeft, Eye, KeyRound, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="bg-primary px-8 py-10 text-white lg:px-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-100">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">U</div>
              <h1 className="mt-6 text-3xl font-black leading-tight">Welcome back to UTME Pro CBT</h1>
              <p className="mt-4 text-blue-100 leading-7">
                Continue your exam prep with targeted revision, timed mock sessions, and score tracking.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-200" />
                <div>
                  <div className="font-semibold">Secure access</div>
                  <div className="text-sm text-blue-100">Protected student accounts and role-based access.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3">
                <Eye className="mt-0.5 h-5 w-5 text-blue-200" />
                <div>
                  <div className="font-semibold">Progress insights</div>
                  <div className="text-sm text-blue-100">Track results and improve weak topics faster.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Login</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Access your student account</h2>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input type="email" placeholder="student@example.com" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-primary focus-within:bg-white">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                  <input type="password" placeholder="Enter your password" className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-sm font-semibold text-primary">Forgot password?</Link>
              </div>

              <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3.5 font-semibold text-white shadow-soft hover:bg-primary/90">
                Log in
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account? <Link href="/register" className="font-semibold text-primary">Create free account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
