import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, LibraryBig, Sparkles } from "lucide-react";

const subjects = [
  { name: "English Language", type: "Compulsory", description: "Use of English remains mandatory for all UTME candidates." },
  { name: "Mathematics", type: "Core", description: "Essential for science, engineering, and quantitative programs." },
  { name: "Physics", type: "Science", description: "Strongly recommended for engineering, medicine, and physical sciences." },
  { name: "Chemistry", type: "Science", description: "Critical for medicine, pharmacy, and applied sciences." },
  { name: "Biology", type: "Life Science", description: "A major requirement for health and life-science courses." },
  { name: "Economics", type: "Commercial", description: "Important for business, management, and public administration." },
  { name: "Government", type: "Arts / Social Science", description: "Supports political science, law, and social studies pathways." },
  { name: "Literature in English", type: "Arts", description: "Relevant for arts and law-related courses." },
  { name: "Geography", type: "Social Science", description: "Useful for planning, environmental, and policy-oriented fields." },
  { name: "Accounting", type: "Commercial", description: "Required for accounting, finance, and business administration." },
  { name: "Agricultural Science", type: "Applied Science", description: "Useful for agriculture and resource-related study tracks." },
  { name: "History", type: "Arts", description: "Relevant for humanities, law, and public administration courses." },
];

export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Subject selection</div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">Choose your UTME subjects</h1>
            </div>

            <div className="rounded-2xl border border-success/20 bg-successSoft px-4 py-3 text-sm text-success font-medium">
              Use of English is compulsory for all candidates.
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-primarySoft border border-primary/10 p-5 text-slate-700">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <p>
                Students should verify all subject combinations against the current official JAMB requirements before finalising their selections. Course-specific combinations may vary by institution and by programme.
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {subjects.map((subject) => (
              <div key={subject.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-primary/40 hover:bg-white transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primarySoft p-2 text-primary">
                      <LibraryBig className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900">{subject.name}</h2>
                      <div className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">{subject.type}</div>
                    </div>
                  </div>
                  <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-primary/40 hover:text-primary">
                    Select
                  </button>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{subject.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-soft">
              Save subject combination
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
