export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Contact</div>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Get in touch</h1>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>Email: support@utmeprocbt.com</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Location: Lagos, Nigeria</p>
          <p>Working hours: Monday to Friday, 9:00 AM – 5:00 PM</p>
        </div>
      </div>
    </main>
  );
}
