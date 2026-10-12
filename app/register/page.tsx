import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Unable to create account.");
      return;
    }

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="bg-slate-950 px-8 py-10 text-white lg:px-12">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300">Back to home</a>
            <div className="mt-8">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Create account</div>
              <h1 className="mt-3 text-3xl font-black leading-tight">Start preparing for a better UTME result</h1>
              <p className="mt-4 text-slate-300 leading-7">Build your study routine, master subject combinations, and track your performance with every mock exam.</p>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Register</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Create your student profile</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Adaeze Okafor" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0803 000 0000" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Choose a password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</label>
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary" />
                </div>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3.5 font-semibold text-white shadow-soft disabled:opacity-70">
                {loading ? "Creating account..." : "Create Free Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <a href="/login" className="font-semibold text-primary">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
