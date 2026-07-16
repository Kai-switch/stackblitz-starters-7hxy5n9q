"use client";

import React, { useState, useEffect } from "react";

type Status = "Not started" | "In progress" | "Done" | "Moved" | "Skipped";

interface Task {
  id: string;
  time: string;
  duration: string;
  title: string;
  category: "CPA" | "Audit" | "Personal" | "Break";
  status: Status;
  preview: string;
  eisenhower: string;
  coach: {
    whyNow: string;
    exactSteps: string[];
    focusTopic?: string;
    formulas?: string[];
    commonMistakes: string[];
    ifStuck: string;
    output: string;
  };
}

export default function XPProductivityHub() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "schedule" | "cpa">("dashboard");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [greeting, setGreeting] = useState("GOOD MORNING");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [schedule, setSchedule] = useState<Task[]>([
    {
      id: "1",
      time: "5:45 AM",
      duration: "15 min",
      title: "Wake Up + Mental Priming",
      category: "Personal",
      status: "Not started",
      preview: "Prime your mind before the day starts. No phone.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Willpower is highest right after waking. This 15 minutes decides the quality of the entire day.",
        exactSteps: [
          "Sit up immediately. Do not check your phone.",
          "Drink 500ml of water.",
          "Take 10 slow deep breaths.",
          "Write your Top 3 priorities for today on paper."
        ],
        commonMistakes: ["Checking WhatsApp or email first thing", "Staying in bed scrolling"],
        ifStuck: "Just stand up and drink the water. Everything else follows.",
        output: "Clear mind + written Top 3 priorities"
      }
    },
    {
      id: "2",
      time: "6:00 AM",
      duration: "55 min",
      title: "CPA Formula Mastery – Probability Core",
      category: "CPA",
      status: "Not started",
      preview: "Active recall of the highest-yield Probability formulas.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Morning is when your brain holds new information best. Formula fluency is non-negotiable for QT.",
        focusTopic: "Conditional Probability + Bayes Theorem + Expected Value",
        formulas: [
          "P(A|B) = P(A ∩ B) / P(B)",
          "Bayes Theorem full form",
          "Expected Value E(X) = Σ x·P(x)",
          "Variance and Standard Deviation formulas"
        ],
        exactSteps: [
          "Close all notes and books.",
          "On a blank page, write every formula from the list above from pure memory.",
          "Mark each formula: Confident / Shaky / Blank.",
          "Open your notes only for the ones you got wrong or blank.",
          "Rewrite the weak ones 3 times."
        ],
        commonMistakes: [
          "Reading the formula sheet instead of writing from memory",
          "Skipping the confidence rating step"
        ],
        ifStuck: "Start only with Expected Value and Variance. Build from what you know.",
        output: "Updated formula sheet with confidence ratings next to each formula"
      }
    },
    {
      id: "3",
      time: "7:00 AM",
      duration: "45 min",
      title: "CPA Timed Drill – Probability Questions",
      category: "CPA",
      status: "Not started",
      preview: "Apply the formulas under exam pressure.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "You just loaded the formulas. Immediately testing them creates strong memory.",
        focusTopic: "Conditional Probability + Expected Value applications",
        exactSteps: [
          "Set a 40-minute timer.",
          "Attempt 8–10 probability questions without looking at solutions.",
          "When the timer ends, mark every question.",
          "For every wrong answer, write the exact reason in your error log."
        ],
        commonMistakes: [
          "Looking at the solution after one attempt",
          "Not writing the root cause of the error"
        ],
        ifStuck: "Skip the hardest question. Keep the timer running.",
        output: "Completed set + error log updated with root causes"
      }
    },
    {
      id: "4",
      time: "9:00 AM",
      duration: "90 min",
      title: "Deep Work – Closing Client Work Paper",
      category: "Audit",
      status: "Not started",
      preview: "Highest priority audit work. Protect this block ruthlessly.",
      eisenhower: "Urgent & Important",
      coach: {
        whyNow: "This is your peak cognitive window. Closing client work must happen here.",
        exactSteps: [
          "Open the current work paper and the related supporting schedules.",
          "Decide the exact section you will finish in this 90 minutes.",
          "Work in silence. Phone on Do Not Disturb.",
          "Write clear conclusions as you go – do not leave them for later."
        ],
        commonMistakes: [
          "Checking email or Teams during the block",
          "Leaving conclusions vague or incomplete"
        ],
        ifStuck: "Write the conclusion first, then fill the testing that supports it.",
        output: "One completed section or full work paper ready for review"
      }
    },
    {
      id: "5",
      time: "10:45 AM",
      duration: "15 min",
      title: "Energy Reset Break",
      category: "Break",
      status: "Not started",
      preview: "Stand, move, hydrate. No screens.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Prevents the afternoon crash. Short recovery multiplies the next deep work block.",
        exactSteps: [
          "Stand up immediately.",
          "Drink water.",
          "Walk for 5–7 minutes or stretch.",
          "Do not open your phone."
        ],
        commonMistakes: ["Scrolling social media", "Sitting and checking messages"],
        ifStuck: "Just walk to the window and look outside for 3 minutes.",
        output: "Physically and mentally reset"
      }
    },
    {
      id: "6",
      time: "11:00 AM",
      duration: "90 min",
      title: "Deep Work Block 2 – Audit Execution",
      category: "Audit",
      status: "Not started",
      preview: "Continue high-quality work paper production.",
      eisenhower: "Urgent & Important",
      coach: {
        whyNow: "Second strongest focus window of the day. Use it on the closing client.",
        exactSteps: [
          "Continue from where you left the previous block.",
          "Aim to finish one full work paper or a major section.",
          "Document evidence clearly so a reviewer can follow without asking questions."
        ],
        commonMistakes: ["Rushing documentation", "Leaving open points without notes"],
        ifStuck: "Ask yourself: What would the manager need to see to sign this off?",
        output: "Clear progress + updated status on the work paper"
      }
    },
    {
      id: "7",
      time: "1:00 PM",
      duration: "60 min",
      title: "Lunch + Real Recovery",
      category: "Break",
      status: "Not started",
      preview: "Eat away from the desk if possible.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Sustained performance requires real recovery, not eating while working.",
        exactSteps: [
          "Leave your desk.",
          "Eat without screens if possible.",
          "Take a short walk after eating."
        ],
        commonMistakes: ["Eating at the desk while answering emails"],
        ifStuck: "At minimum, stand up and eat away from the laptop.",
        output: "Restored energy for the afternoon"
      }
    },
    {
      id: "8",
      time: "2:00 PM",
      duration: "90 min",
      title: "Afternoon Deep Work – Audit",
      category: "Audit",
      status: "Not started",
      preview: "Final high-output block of the workday.",
      eisenhower: "Urgent & Important",
      coach: {
        whyNow: "Last deep work window before energy naturally drops.",
        exactSteps: [
          "Choose the next highest priority work paper.",
          "Set a clear 90-minute target (e.g. finish testing + conclusion).",
          "Work with full focus."
        ],
        commonMistakes: ["Allowing meetings to destroy this block", "Low-quality documentation"],
        ifStuck: "Switch to a simpler work paper if mental energy is low.",
        output: "Another work paper advanced or completed"
      }
    },
    {
      id: "9",
      time: "4:00 PM",
      duration: "45 min",
      title: "End-of-Day Audit Wrap + Tomorrow Setup",
      category: "Audit",
      status: "Not started",
      preview: "Close the day cleanly and prepare tomorrow’s first task.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "A clean close prevents mental residue and makes tomorrow easier.",
        exactSteps: [
          "Update status on all open work papers.",
          "Write the exact first task for tomorrow morning.",
          "Note any questions for the manager."
        ],
        commonMistakes: ["Leaving the day without a clear tomorrow starting point"],
        ifStuck: "Just write one sentence: Tomorrow I will start with ______.",
        output: "Clean status + tomorrow’s first task written"
      }
    },
    {
      id: "10",
      time: "8:00 PM",
      duration: "75 min",
      title: "Evening CPA Block – Hypothesis Testing",
      category: "CPA",
      status: "Not started",
      preview: "Targeted evening study on a high-weight topic.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Consistent evening study is what separates people who pass from those who struggle.",
        focusTopic: "Hypothesis Testing + Confidence Intervals",
        exactSteps: [
          "Review your error log from previous hypothesis testing practice.",
          "Write the 5-step hypothesis testing process from memory.",
          "Practice 6–8 questions under timed conditions.",
          "For every wrong answer, write why the correct answer is right."
        ],
        commonMistakes: [
          "Studying a new topic when weak areas still exist",
          "Not reviewing the error log first"
        ],
        ifStuck: "Re-do only the questions you got wrong in previous sessions.",
        output: "Updated error log + clearer understanding of hypothesis testing conclusions"
      }
    },
    {
      id: "11",
      time: "11:00 PM",
      duration: "—",
      title: "Wind Down + Sleep",
      category: "Personal",
      status: "Not started",
      preview: "Protect sleep. Minimum 5 hours.",
      eisenhower: "Important but Not Urgent",
      coach: {
        whyNow: "Sleep is a performance drug. Poor sleep destroys both audit quality and CPA retention.",
        exactSteps: [
          "Phone on charge outside the bedroom if possible.",
          "No screens 20 minutes before bed.",
          "Lights out by 11:15 PM latest."
        ],
        commonMistakes: ["Scrolling in bed", "Working past 11 PM"],
        ifStuck: "Put the phone in another room right now.",
        output: "Quality sleep"
      }
    }
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("GOOD MORNING");
    else if (hour < 17) setGreeting("GOOD AFTERNOON");
    else setGreeting("GOOD EVENING");
  }, []);

  const completed = schedule.filter((t) => t.status === "Done").length;
  const total = schedule.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const updateStatus = (id: string, status: Status) => {
    setSchedule((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id: string) => {
    if (confirm("Delete this task?")) {
      setSchedule((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      time: "Flexible",
      duration: "45 min",
      title: newTaskTitle,
      category: "Audit",
      status: "Not started",
      preview: "Newly added task",
      eisenhower: "Urgent & Important",
      coach: {
        whyNow: "This was added during the day. Treat it with high priority.",
        exactSteps: ["Define the exact next physical action", "Execute for at least 25 minutes"],
        commonMistakes: ["Adding without a clear next action"],
        ifStuck: "Break it into a 25-minute action only.",
        output: "Visible progress or completion"
      }
    };
    setSchedule((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setShowAddModal(false);
    setActiveTab("schedule");
  };

  return (
    <div className="min-h-screen bg-[#0C0907] text-[#F5EDE4]">
      {/* NAV */}
      <nav className="bg-[#16110E] border-b border-[#2F2620] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C68E5E] to-[#B84C3C] flex items-center justify-center font-bold">
              XP
            </div>
            <div>
              <div className="font-semibold">XP Productivity Hub</div>
              <div className="text-xs text-[#A38F7A]">Daily Execution Coach</div>
            </div>
          </div>
          <div className="flex gap-1">
            {(["dashboard", "schedule", "cpa"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[#C68E5E] text-white"
                    : "bg-[#221A16] text-[#A38F7A] hover:bg-[#2A211C]"
                }`}
              >
                {tab === "cpa" ? "CPA Focus" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-[#221A16] text-[#A38F7A] hover:bg-[#2A211C]"
            >
              + Add
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#1A1410] to-[#16110E] border border-[#2F2620] rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div>
                  <div className="text-[#C68E5E] text-sm tracking-[0.2em] mb-1">{greeting}, CHRIS</div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                    Ready to execute at a higher level.
                  </h1>
                  <p className="text-[#A38F7A] max-w-lg">
                    Today’s focus: Closing client work papers + Probability mastery + Hypothesis Testing in the evening.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-[#C68E5E]">{progress}</div>
                  <div className="text-xs text-[#A38F7A] tracking-wider mt-1">EFFICIENCY SCORE</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-[#16110E] border border-[#2F2620] rounded-3xl p-5">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-[#C68E5E] text-xs tracking-widest">TODAY&apos;S PROGRESS</div>
                  <div className="text-xl font-semibold mt-1">
                    {completed} of {total} blocks completed
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#C68E5E]">{progress}%</div>
              </div>
              <div className="w-full bg-[#221A16] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#C68E5E] to-[#B84C3C] h-2 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Today's CPA Focus - Prominent */}
            <div className="bg-[#1A1410] border border-[#C68E5E]/40 rounded-3xl p-6">
              <div className="text-[#C68E5E] text-xs tracking-widest mb-2">TODAY&apos;S CPA FOCUS</div>
              <h2 className="text-xl font-semibold mb-1">Probability Core + Hypothesis Testing</h2>
              <p className="text-sm text-[#A38F7A] mb-4">
                Morning: Master Conditional Probability, Bayes, Expected Value through active recall + timed questions.
                Evening: Hypothesis Testing process + confidence intervals under timed conditions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-[#C68E5E]/15 text-[#C68E5E] rounded-full">Conditional Probability</span>
                <span className="text-xs px-3 py-1 bg-[#C68E5E]/15 text-[#C68E5E] rounded-full">Bayes Theorem</span>
                <span className="text-xs px-3 py-1 bg-[#C68E5E]/15 text-[#C68E5E] rounded-full">Expected Value</span>
                <span className="text-xs px-3 py-1 bg-[#B84C3C]/15 text-[#B84C3C] rounded-full">Hypothesis Testing</span>
              </div>
            </div>

            {/* Mission + 5pm */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3 bg-[#16110E] border border-[#2F2620] rounded-3xl p-6">
                <div className="text-[#C68E5E] text-xs tracking-widest mb-2">MISSION BRIEF</div>
                <p className="leading-relaxed">
                  Protect the 9:00–12:30 deep work window for the closing client. Do not let meetings destroy it.
                  Evening CPA block is non-negotiable. Sleep by 11:15 PM.
                </p>
              </div>
              <div className="md:col-span-2 bg-[#16110E] border border-[#B84C3C]/40 rounded-3xl p-6">
                <div className="text-[#B84C3C] text-xs tracking-widest mb-2">5PM PRIORITY CHECK</div>
                <p className="text-sm text-[#A38F7A] mb-4">
                  Review completed work. Decide what carries forward with clear next actions.
                </p>
                <button
                  onClick={() => setShowReminder(true)}
                  className="w-full py-2.5 bg-[#B84C3C] hover:bg-[#A33F32] text-white rounded-xl text-sm font-medium"
                >
                  Open Priority Review
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowReflection(true)}
              className="w-full py-3.5 bg-[#221A16] hover:bg-[#2A211C] border border-[#2F2620] rounded-2xl text-sm"
            >
              Open Daily Reflection
            </button>
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Execution Schedule</h2>
                <p className="text-sm text-[#A38F7A]">Click any block to open the AI Coach guidance</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-[#C68E5E] hover:bg-[#B87D4F] text-white rounded-xl text-sm font-medium"
              >
                + Add Task
              </button>
            </div>

            <div className="space-y-3">
              {schedule.map((task) => (
                <div key={task.id} className="bg-[#16110E] border border-[#2F2620] rounded-2xl overflow-hidden">
                  <div
                    className="px-5 py-4 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {task.time} · {task.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-[#2F2620] rounded-full text-[#C68E5E]">
                            {task.eisenhower}
                          </span>
                        </div>
                        <p className="text-sm text-[#A38F7A]">{task.preview}</p>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={task.status}
                          onChange={(e) => updateStatus(task.id, e.target.value as Status)}
                          className="bg-[#221A16] border border-[#2F2620] text-sm rounded-lg px-3 py-1.5"
                        >
                          <option>Not started</option>
                          <option>In progress</option>
                          <option>Done</option>
                          <option>Moved</option>
                          <option>Skipped</option>
                        </select>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-[#B84C3C] text-sm px-2 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI COACH PANEL */}
                  {expandedId === task.id && (
                    <div className="px-5 pb-5 border-t border-[#2F2620] pt-4 space-y-4 text-sm">
                      <div className="bg-[#1A1410] rounded-xl p-4">
                        <div className="text-[#C68E5E] font-medium mb-1">Why this block exists right now</div>
                        <p className="text-[#A38F7A]">{task.coach.whyNow}</p>
                      </div>

                      {task.coach.focusTopic && (
                        <div>
                          <div className="text-[#C68E5E] font-medium mb-1">Specific Focus Topic</div>
                          <p className="text-white font-medium">{task.coach.focusTopic}</p>
                        </div>
                      )}

                      {task.coach.formulas && (
                        <div>
                          <div className="text-[#C68E5E] font-medium mb-2">Formulas to master today</div>
                          <ul className="space-y-1">
                            {task.coach.formulas.map((f, i) => (
                              <li key={i} className="text-[#A38F7A] flex gap-2">
                                <span className="text-[#C68E5E]">→</span> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <div className="text-[#C68E5E] font-medium mb-2">Exact Steps</div>
                        <ol className="space-y-1.5 list-decimal list-inside text-[#A38F7A]">
                          {task.coach.exactSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <div className="text-[#C68E5E] font-medium mb-2">Common Mistakes to Avoid</div>
                        <ul className="space-y-1">
                          {task.coach.commonMistakes.map((m, i) => (
                            <li key={i} className="text-[#A38F7A] flex gap-2">
                              <span className="text-[#B84C3C]">×</span> {m}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#1A1410] rounded-xl p-3">
                          <div className="text-[#C68E5E] text-xs font-medium mb-1">If you get stuck</div>
                          <p className="text-[#A38F7A] text-sm">{task.coach.ifStuck}</p>
                        </div>
                        <div className="bg-[#1A1410] rounded-xl p-3">
                          <div className="text-[#C68E5E] text-xs font-medium mb-1">Expected Output</div>
                          <p className="text-[#A38F7A] text-sm">{task.coach.output}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CPA FOCUS TAB */}
        {activeTab === "cpa" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">CPA Quantitative Techniques</h2>
              <p className="text-[#A38F7A]">Exam: 24 August 2026 · Daily compound system</p>
            </div>

            <div className="bg-[#1A1410] border border-[#C68E5E]/30 rounded-3xl p-6">
              <div className="text-[#C68E5E] text-xs tracking-widest mb-2">CURRENT PRIORITY ORDER</div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-lg">1. Probability & Statistics (Highest)</div>
                  <p className="text-sm text-[#A38F7A] mt-1">
                    Conditional Probability, Bayes Theorem, Expected Value, Variance. Write formulas from memory every morning. Timed questions every other day.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-lg">2. Hypothesis Testing & Confidence Intervals</div>
                  <p className="text-sm text-[#A38F7A] mt-1">
                    Master the 5-step process. Practice writing the final conclusion sentence. Know Type I vs Type II errors cold.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-lg">3. Forecasting & Time Series</div>
                  <p className="text-sm text-[#A38F7A] mt-1">
                    Moving averages, exponential smoothing, forecast accuracy measures (MAD, MSE, MAPE).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#16110E] border border-[#2F2620] rounded-3xl p-6">
              <div className="text-[#C68E5E] text-xs tracking-widest mb-3">HOW TO STUDY EACH BLOCK</div>
              <div className="space-y-3 text-sm text-[#A38F7A]">
                <p><strong className="text-white">Morning Formula block:</strong> Pure active recall. No notes open until you have written everything from memory.</p>
                <p><strong className="text-white">Timed Drill:</strong> Exam conditions. Timer on. Review only after the timer ends. Log every error with the root cause.</p>
                <p><strong className="text-white">Evening block:</strong> Attack your weakest area from the error log. Do not start new topics while weak areas remain.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#16110E] border border-[#2F2620] rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <input
              className="w-full bg-[#221A16] border border-[#2F2620] rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#C68E5E]"
              placeholder="What needs to be done?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <div className="flex gap-3">
              <button onClick={addTask} className="flex-1 py-3 bg-[#C68E5E] text-white rounded-xl font-medium">
                Add Task
              </button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-[#2F2620] rounded-xl text-[#A38F7A]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5PM MODAL */}
      {showReminder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#16110E] border border-[#B84C3C]/40 rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3 text-[#B84C3C]">5:00 PM Priority Review</h3>
            <p className="text-sm text-[#A38F7A] mb-5">
              Look at every task. Mark what is Done. For anything incomplete, decide the exact next action and whether it moves to tomorrow.
            </p>
            <button
              onClick={() => {
                setShowReminder(false);
                setActiveTab("schedule");
              }}
              className="w-full py-3 bg-[#B84C3C] text-white rounded-xl font-medium"
            >
              Go Update Schedule
            </button>
          </div>
        </div>
      )}

      {/* REFLECTION MODAL */}
      {showReflection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#16110E] border border-[#2F2620] rounded-3xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-5">Daily Reflection</h3>
            <div className="space-y-3 text-sm text-[#A38F7A]">
              <p>1. What was the single biggest win today?</p>
              <p>2. What was the biggest source of friction or delay?</p>
              <p>3. Did I protect the deep work and CPA blocks?</p>
              <p>4. What exactly carries forward to tomorrow?</p>
              <p>5. What is the one thing I will do differently tomorrow?</p>
            </div>
            <button
              onClick={() => setShowReflection(false)}
              className="w-full mt-6 py-3 bg-[#C68E5E] text-white rounded-xl font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}