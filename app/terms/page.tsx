export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Terms of use</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Terms of service</h1>
        <div className="mt-8 space-y-5 text-slate-700 leading-7">
          <p>Students must use the platform lawfully and responsibly, including for JAMB UTME practice, revision, and exam preparation.</p>
          <p>Unauthorized attempts to access or manipulate the system, alter scores, or misuse examination data are prohibited.</p>
          <p>Platform content is intended for educational support and must be used in line with all relevant laws and institutional requirements.</p>
          <p>UTME Pro CBT may update these terms to improve platform security, functionality, and educational support over time.</p>
        </div>
      </div>
    </main>
  );
}
