"use client";

import { useEffect, useMemo, useState } from "react";
import { Flag, RefreshCcw, ChevronLeft, ChevronRight, Send, Check } from "lucide-react";
import { examQuestions } from "@/lib/mock-data";

export default function ExamSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(42 * 60);
  const [savedAt, setSavedAt] = useState<string>(new Date().toLocaleTimeString());

  const currentQuestion = examQuestions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("utme-pro-cbt-exam");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setSelectedAnswers(parsed.answers ?? {});
      setMarkedForReview(parsed.review ?? {});
      setCurrentIndex(parsed.currentIndex ?? 0);
    } catch {
      // Ignore invalid local storage data.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "utme-pro-cbt-exam",
      JSON.stringify({
        answers: selectedAnswers,
        review: markedForReview,
        currentIndex,
      })
    );
    setSavedAt(new Date().toLocaleTimeString());
  }, [selectedAnswers, markedForReview, currentIndex]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((value) => String(value).padStart(2, "0")).join(":");
  };

  const navItems = useMemo(() => {
    return examQuestions.map((question, index) => {
      const key = question.id;
      const state =
        markedForReview[key] ? "review"
        : selectedAnswers[key] ? "answered"
        : currentIndex === index ? "current"
        : "unanswered";

      return { id: index + 1, state, isCurrent: currentIndex === index };
    });
  }, [currentIndex, markedForReview, selectedAnswers]);

  const chooseAnswer = (optionLabel: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionLabel }));
  };

  const clearAnswer = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const toggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const submitExam = () => {
    const confirmed = window.confirm("Are you sure you want to submit this examination?");
    if (confirmed) {
      alert("Exam submitted successfully. Results are ready for review.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">JAMB UTME Mock Exam</div>
              <h1 className="mt-2 text-2xl font-black">Use of English • Subject Practice</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Question <span className="font-bold text-primary">{currentIndex + 1}</span> / {examQuestions.length}
              </div>
              <div className="rounded-xl border border-danger/20 bg-dangerSoft px-3 py-2 text-sm font-bold text-danger">
                {formatTime(remainingSeconds)}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.45fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-500">Current question</div>
              <div className="inline-flex items-center gap-2 rounded-full bg-successSoft px-3 py-1 text-xs font-bold text-success">
                <Check className="h-3.5 w-3.5" /> Auto-saved at {savedAt}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-bold uppercase tracking-[0.15em] text-primary">Q{currentIndex + 1}</div>
              <h2 className="mt-4 text-xl font-bold leading-8 text-slate-900">{currentQuestion.text}</h2>
            </div>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.label;

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => chooseAnswer(option.label)}
                    className={[
                      "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-primary/40 hover:bg-primarySoft",
                      isSelected ? "border-primary bg-primarySoft" : "border-slate-200 bg-white",
                    ].join(" ")}
                  >
                    <span className={[
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                      isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-700",
                    ].join(" ")}>
                      {option.label}
                    </span>
                    <span className="text-base text-slate-700">{option.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  type="button"
                  disabled={currentIndex === examQuestions.length - 1}
                  onClick={() => setCurrentIndex((i) => Math.min(examQuestions.length - 1, i + 1))}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleReview}
                  className={[
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold",
                    markedForReview[currentQuestion.id]
                      ? "border-amber-300 bg-amber-100 text-amber-700"
                      : "border-amber-200 bg-amber-50 text-amber-700",
                  ].join(" ")}
                >
                  <Flag className="h-4 w-4" />
                  {markedForReview[currentQuestion.id] ? "Reviewing" : "Mark for Review"}
                </button>
                <button
                  type="button"
                  onClick={clearAnswer}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  <RefreshCcw className="h-4 w-4" /> Clear Answer
                </button>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Question navigation</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Check className="h-3.5 w-3.5" />
                Auto-save enabled
              </div>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(item.id - 1)}
                  className={[
                    "relative flex h-11 items-center justify-center rounded-xl text-sm font-bold border",
                    item.state === "answered" && "border-success/30 bg-success/10 text-success",
                    item.state === "review" && "border-amber-300 bg-amber-100 text-amber-700",
                    item.state === "current" && "border-primary bg-primary text-white",
                    item.state === "unanswered" && "border-slate-200 bg-slate-50 text-slate-700",
                  ].join(" ")}
                >
                  {item.id}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700"><span className="h-3 w-3 rounded-full bg-slate-200" /> Unanswered</div>
              <div className="flex items-center gap-2 text-slate-700"><span className="h-3 w-3 rounded-full bg-success/70" /> Answered</div>
              <div className="flex items-center gap-2 text-slate-700"><span className="h-3 w-3 rounded-full bg-amber-300" /> Marked for Review</div>
              <div className="flex items-center gap-2 text-slate-700"><span className="h-3 w-3 rounded-full bg-primary" /> Current</div>
            </div>

            <button
              type="button"
              onClick={submitExam}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white shadow-soft"
            >
              <Send className="h-4 w-4" /> Submit Examination
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
