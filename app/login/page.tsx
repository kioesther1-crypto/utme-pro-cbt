import { useState } from "react";

export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Unable to log in.");
      return;
    }

    localStorage.setItem("utme-auth-token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="bg-primary px-8 py-10 text-white lg:px-12">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-100">Back to home</a>
            <div className="mt-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">U</div>
              <h1 className="mt-6 text-3xl font-black leading-tight">Welcome back to UTME Pro CBT</h1>
              <p className="mt-4 text-blue-100 leading-7">Continue your exam prep with targeted revision, timed mocks, and score tracking.</p>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Login</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Access your student account</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary"
                  placeholder="student@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-primary"
                  placeholder="Enter your password"
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3.5 font-semibold text-white shadow-soft disabled:opacity-70">
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account? <a href="/register" className="font-semibold text-primary">Create free account</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
