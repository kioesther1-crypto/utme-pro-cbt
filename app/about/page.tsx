export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">About us</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">UTME Pro CBT</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          UTME Pro CBT is a purpose-built JAMB UTME preparation platform designed for Nigerian students who want structured, realistic, and efficient exam practice.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
            <p className="mt-3 text-slate-600 leading-7">
              To help students study smarter, build confidence, and improve performance through realistic practice and data-driven revision.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-900">Our approach</h2>
            <p className="mt-3 text-slate-600 leading-7">
              We blend timed CBT practice, targeted revision, and performance insights so students can focus on the areas that matter most.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
