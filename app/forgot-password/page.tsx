import Link from "next/link";
export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Reset password</div>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Forgot your password?</h1>
        <p className="mt-3 text-slate-600 leading-7">Enter your registered email and we will send a secure reset link to continue.</p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
            <input type="email" placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary focus:bg-white" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white">Send reset link</button>
        </form>
        <div className="mt-5 text-center text-sm text-slate-600">
          Back to <Link href="/login" className="font-semibold text-primary">login</Link>
        </div>
      </div>
    </main>
  );
}
