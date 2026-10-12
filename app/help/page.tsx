export default function HelpPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Help center</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">How can we help?</h1>
        <div className="mt-8 space-y-6 text-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900">I forgot my password</h2>
            <p className="mt-2 leading-7">Use the forgot password flow on the login page to reset access with a secure recovery link.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">How do I choose my subjects?</h2>
            <p className="mt-2 leading-7">Visit the subjects page, select your four UTME subjects, and confirm your combination before saving.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Can I retake mock exams?</h2>
            <p className="mt-2 leading-7">Yes. Students can retake mock exams and review performance to improve weak areas.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
