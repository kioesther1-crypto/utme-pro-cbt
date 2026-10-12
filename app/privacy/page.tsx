export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Privacy policy</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Your privacy matters</h1>
        <div className="mt-8 space-y-5 text-slate-700 leading-7">
          <p>UTME Pro CBT protects student data and stores information securely according to modern platform standards.</p>
          <p>We use account data only to provide exam prep functionality, track study progress, and support secure authentication.</p>
          <p>Passwords are never stored in plain text, and access to student-specific data is restricted to the relevant user and authorized administrators.</p>
          <p>Students may contact support to request access, corrections, or deletion of personal data where supported by applicable policies.</p>
        </div>
      </div>
    </main>
  );
}
