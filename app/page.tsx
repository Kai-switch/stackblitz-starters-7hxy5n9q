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
  whyNow: string;
  whatToDo: string;
  documents: string;
  commonMistakes: string;
  ifStuck: string;
  output: string;
  moveToTomorrow: string;
}

export default function XPProductivityHub() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "schedule" | "cpa" | "add">("dashboard");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [greeting, setGreeting] = useState("GOOD MORNING");

  const [schedule, setSchedule] = useState<Task[]>([
    {
      id: "1",
      time: "5:45 AM",
      duration: "15 min",
      title: "Wake Up & Mental Priming",
      category: "Personal",
      status: "Not started",
      preview: "Wake up, hydrate, and prime your mind for high-performance execution.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Early morning is when willpower is highest. Starting the day intentionally sets the tone.",
      whatToDo: "Drink 500ml water, do 2 minutes of deep breathing, and write your top 3 priorities for the day.",
      documents: "None – this is mental preparation.",
      commonMistakes: "Checking phone immediately, staying in bed, or skipping hydration.",
      ifStuck: "Just sit up and drink water. Momentum will follow.",
      output: "Clear mind and written top 3 priorities.",
      moveToTomorrow: "Nothing – this is non-negotiable."
    },
    {
      id: "2",
      time: "6:00 AM",
      duration: "60 min",
      title: "CPA Quantitative Techniques – Formula Mastery",
      category: "CPA",
      status: "Not started",
      preview: "Active recall of Probability, Statistics and Hypothesis Testing formulas.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Your brain is freshest in the morning. Formula mastery compounds daily.",
      whatToDo: "Close all notes. Write every formula from memory. Then check accuracy. Focus on Conditional Probability, Expected Value, and Confidence Intervals.",
      documents: "Your formula sheet + previous error log.",
      commonMistakes: "Passive reading instead of active recall. Skipping the error log review.",
      ifStuck: "Start with the formulas you know best. Build confidence first.",
      output: "Updated formula sheet with confidence ratings next to each formula.",
      moveToTomorrow: "Any formula you still cannot write from memory."
    },
    {
      id: "3",
      time: "7:15 AM",
      duration: "45 min",
      title: "CPA Practice Drill – Timed Questions",
      category: "CPA",
      status: "Not started",
      preview: "Timed practice on Probability and Statistics questions under exam conditions.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Immediately after formula review while the knowledge is still active.",
      whatToDo: "Set a 40-minute timer. Attempt 8–10 questions without looking at solutions. Mark and review thoroughly after.",
      documents: "CPA practice questions + answer key.",
      commonMistakes: "Looking at solutions too early. Not reviewing why you got a question wrong.",
      ifStuck: "Skip the hardest question and return later. Keep moving.",
      output: "Completed practice set + error log updated with root causes.",
      moveToTomorrow: "Any question type you scored below 70% on."
    },
    {
      id: "4",
      time: "9:00 AM",
      duration: "90 min",
      title: "Deep Work Block 1 – Closing Client Work Paper",
      category: "Audit",
      status: "Not started",
      preview: "High-focus execution on the urgent closing client.",
      eisenhower: "Urgent & Important",
      whyNow: "Peak cognitive hours. Protect this block from meetings and interruptions.",
      whatToDo: "Open the current work paper. Complete testing, documentation, and conclusions. Aim to finish one full work paper.",
      documents: "Client trial balance, previous year work papers, audit program, supporting schedules.",
      commonMistakes: "Multitasking, checking email, incomplete documentation of conclusions.",
      ifStuck: "Write the conclusion first, then fill in the testing that supports it.",
      output: "Completed work paper ready for review (or clear status of what remains).",
      moveToTomorrow: "Any incomplete sections with clear next actions noted."
    },
    {
      id: "5",
      time: "10:45 AM",
      duration: "15 min",
      title: "Micro Break & Energy Reset",
      category: "Break",
      status: "Not started",
      preview: "Stand up, stretch, hydrate, and reset focus.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Prevents cognitive fatigue before the next deep work block.",
      whatToDo: "Stand, stretch for 5 minutes, drink water, walk for 5–7 minutes if possible.",
      documents: "None.",
      commonMistakes: "Checking social media or email during the break.",
      ifStuck: "Just stand up and look out of the window for 3 minutes.",
      output: "Refreshed mind and body.",
      moveToTomorrow: "Nothing."
    },
    {
      id: "6",
      time: "11:00 AM",
      duration: "90 min",
      title: "Deep Work Block 2 – Closing Client or Ongoing Client",
      category: "Audit",
      status: "Not started",
      preview: "Continue high-quality work paper execution.",
      eisenhower: "Urgent & Important",
      whyNow: "Second peak focus window of the morning.",
      whatToDo: "Continue or start the next work paper. Focus on quality of evidence and clear conclusions.",
      documents: "Same as previous audit block.",
      commonMistakes: "Rushing documentation. Leaving conclusions vague.",
      ifStuck: "Ask: What would the reviewer need to see to be satisfied?",
      output: "Progress on work paper + clear next steps written.",
      moveToTomorrow: "Incomplete testing with specific follow-up actions."
    },
    {
      id: "7",
      time: "1:00 PM",
      duration: "60 min",
      title: "Lunch + Mental Recovery",
      category: "Break",
      status: "Not started",
      preview: "Proper break away from the desk.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Sustains energy for the afternoon deep work.",
      whatToDo: "Eat away from the screen if possible. No audit discussion during lunch.",
      documents: "None.",
      commonMistakes: "Eating at the desk while working.",
      ifStuck: "Just leave the desk for 40 minutes.",
      output: "Restored energy.",
      moveToTomorrow: "Nothing."
    },
    {
      id: "8",
      time: "2:00 PM",
      duration: "90 min",
      title: "Deep Work Block 3 – Audit Execution",
      category: "Audit",
      status: "Not started",
      preview: "Continue client work with high quality standards.",
      eisenhower: "Urgent & Important",
      whyNow: "Afternoon focus block. Protect it.",
      whatToDo: "Complete remaining testing or start a new work paper. Aim for 1 full work paper output.",
      documents: "Client files, audit program, supporting evidence.",
      commonMistakes: "Low-quality documentation due to afternoon fatigue.",
      ifStuck: "Switch to a simpler work paper if energy is low.",
      output: "Completed or substantially advanced work paper.",
      moveToTomorrow: "Anything incomplete with clear status."
    },
    {
      id: "9",
      time: "3:45 PM",
      duration: "15 min",
      title: "Status Update & Review Notes",
      category: "Audit",
      status: "Not started",
      preview: "Update progress and note any review points.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Creates clean handoff and visibility.",
      whatToDo: "Update the work paper status. Note any pending items or questions for the manager.",
      documents: "Current work papers.",
      commonMistakes: "Leaving status unclear for the reviewer.",
      ifStuck: "Write one sentence: Current status is X, next action is Y.",
      output: "Clear status update.",
      moveToTomorrow: "Any open questions."
    },
    {
      id: "10",
      time: "4:00 PM",
      duration: "60 min",
      title: "Final Audit Push + Wrap-up",
      category: "Audit",
      status: "Not started",
      preview: "Close out the day cleanly.",
      eisenhower: "Urgent & Important",
      whyNow: "Last focused window before end of workday.",
      whatToDo: "Finish one more section or clear outstanding queries. Prepare tomorrow’s first task.",
      documents: "Outstanding queries list.",
      commonMistakes: "Leaving loose ends without notes.",
      ifStuck: "Write a clear handover note for yourself tomorrow morning.",
      output: "Clean end-of-day status + tomorrow’s first task written.",
      moveToTomorrow: "All incomplete items with priorities."
    },
    {
      id: "11",
      time: "8:00 PM",
      duration: "75 min",
      title: "Evening CPA Study Block",
      category: "CPA",
      status: "Not started",
      preview: "Focused study on weaker CPA areas after work.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Consistent evening study compounds toward 24 August 2026 exam.",
      whatToDo: "Review error log from morning. Practice the weakest area (e.g. Hypothesis Testing or Forecasting). Timed if possible.",
      documents: "Error log + practice questions.",
      commonMistakes: "Studying new topics when weak areas still exist.",
      ifStuck: "Re-do the questions you got wrong this morning.",
      output: "Updated error log + confidence improvement notes.",
      moveToTomorrow: "Any concept still unclear."
    },
    {
      id: "12",
      time: "11:00 PM",
      duration: "—",
      title: "Wind Down & Sleep",
      category: "Personal",
      status: "Not started",
      preview: "Protect sleep. Minimum 5 hours target.",
      eisenhower: "Important but Not Urgent",
      whyNow: "Sleep is a performance multiplier for both audit and CPA.",
      whatToDo: "No screens 20 minutes before bed. Prepare clothes and bag for tomorrow. Lights out by 11:15pm latest.",
      documents: "None.",
      commonMistakes: "Scrolling phone in bed.",
      ifStuck: "Put the phone in another room.",
      output: "Quality sleep.",
      moveToTomorrow: "Nothing – protect this."
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

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
    if (confirm("Are you sure you want to delete this task?")) {
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
      preview: "Newly added task – re-optimise the day around this.",
      eisenhower: "Urgent & Important",
      whyNow: "Added during the day – treat with high priority.",
      whatToDo: "Define the exact next action and execute.",
      documents: "To be determined.",
      commonMistakes: "Adding without clear next action.",
      ifStuck: "Break it into a 25-minute action.",
      output: "Clear progress or completed task.",
      moveToTomorrow: "If incomplete, move with clear next step."
    };
    setSchedule((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setShowAddModal(false);
    setActiveTab("schedule");
  };

  return (
    <div className="min-h-screen bg-[#0F0A08] text-[#F5EDE4]">
      {/* Navigation */}
      <nav className="bg-[#1A1410] border-b border-[#3A2F28] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C68E5E] to-[#B84C3C] flex items-center justify-center font-bold text-lg">
              XP
            </div>
            <div>
              <div className="font-semibold text-lg">XP Productivity Hub</div>
              <div className="text-xs text-[#A38F7A]">Audit + CPA Daily Command Centre</div>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            {(["dashboard", "schedule", "cpa", "add"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === "add") setShowAddModal(true);
                  else setActiveTab(tab);
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab ? "bg-[#C68E5E] text-white" : "bg-[#221A16] text-[#A38F7A] hover:bg-[#2A211C]"
                }`}
              >
                {tab === "cpa" ? "CPA Tracker" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="bg-[#1A1410] border border-[#3A2F28] rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="text-[#C68E5E] text-sm tracking-widest mb-1">{greeting}, CHRIS</div>
                  <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">XP Productivity Hub</h1>
                  <p className="text-[#A38F7A] mt-2 max-w-xl">
                    An intelligent system designed to help you execute at a higher level every day.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-5xl sm:text-6xl font-bold text-[#C68E5E]">{progress}</div>
                  <div className="text-xs text-[#A38F7A] tracking-wider">EFFICIENCY SCORE</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-[#1A1410] border border-[#3A2F28] rounded-3xl p-6">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-[#C68E5E] text-xs tracking-widest">TODAY&apos;S PROGRESS</div>
                  <div className="text-2xl font-semibold mt-1">
                    {completed} of {total} tasks completed
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#C68E5E]">{progress}%</div>
              </div>
              <div className="w-full bg-[#221A16] rounded-full h-2.5">
                <div
                  className="bg-[#C68E5E] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Mission + 5pm */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-[#1A1410] border border-[#3A2F28] rounded-3xl p-6">
                <div className="text-[#C68E5E] text-xs tracking-widest mb-2">TODAY&apos;S MISSION BRIEF</div>
                <p className="text-[#F5EDE4] leading-relaxed">
                  Use your morning peak energy on closing client work. Protect the 8:00pm CPA block. Finish the day with clarity and respect your 11:00pm bedtime.
                </p>
              </div>
              <div className="bg-[#1A1410] border border-[#B84C3C]/50 rounded-3xl p-6">
                <div className="text-[#B84C3C] text-xs tracking-widest mb-2">5PM PRIORITY CHECK</div>
                <p className="text-sm text-[#A38F7A] mb-4">
                  Review what was completed and decide what moves to tomorrow with clear intention.
                </p>
                <button
                  onClick={() => setShowReminder(true)}
                  className="w-full py-2.5 bg-[#B84C3C] hover:bg-[#A33F32] text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Open 5pm Priority Review
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowReflection(true)}
              className="w-full py-3.5 bg-[#221A16] hover:bg-[#2A211C] border border-[#3A2F28] rounded-2xl text-sm font-medium transition-colors"
            >
              Open Daily Reflection Questions
            </button>
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">Today&apos;s Execution Schedule</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-[#C68E5E] hover:bg-[#B87D4F] text-white rounded-xl text-sm font-medium transition-colors"
              >
                + Add New Task
              </button>
            </div>

            <div className="space-y-3">
              {schedule.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#1A1410] border border-[#3A2F28] rounded-2xl overflow-hidden"
                >
                  <div
                    className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-lg">
                          {task.time} — {task.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#3A2F28] rounded-full text-[#C68E5E]">
                          {task.eisenhower}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 bg-[#221A16] rounded-full text-[#A38F7A]">
                          {task.category}
                        </span>
                      </div>
                      <p className="text-sm text-[#A38F7A]">{task.preview}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value as Status)}
                        className="bg-[#221A16] border border-[#3A2F28] text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                      >
                        <option>Not started</option>
                        <option>In progress</option>
                        <option>Done</option>
                        <option>Moved</option>
                        <option>Skipped</option>
                      </select>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-[#B84C3C] hover:text-white text-sm px-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded AI Coach Panel */}
                  {expandedId === task.id && (
                    <div className="px-5 pb-5 border-t border-[#3A2F28] pt-4 space-y-3 text-sm">
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">Why am I doing this now?</div>
                        <p className="text-[#A38F7A]">{task.whyNow}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">What exactly should I do?</div>
                        <p className="text-[#A38F7A]">{task.whatToDo}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">Documents / Inputs needed</div>
                        <p className="text-[#A38F7A]">{task.documents}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">Common mistakes to avoid</div>
                        <p className="text-[#A38F7A]">{task.commonMistakes}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">If I get stuck...</div>
                        <p className="text-[#A38F7A]">{task.ifStuck}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">Expected Output</div>
                        <p className="text-[#A38F7A]">{task.output}</p>
                      </div>
                      <div>
                        <div className="text-[#C68E5E] font-medium mb-1">What moves to tomorrow if incomplete?</div>
                        <p className="text-[#A38F7A]">{task.moveToTomorrow}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CPA TRACKER */}
        {activeTab === "cpa" && (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">CPA Quantitative Techniques Tracker</h2>
            <p className="text-[#A38F7A]">Exam Date: 24 August 2026 • Focus on high-yield topics</p>

            <div className="grid gap-4">
              {[
                {
                  topic: "Statistics & Probability",
                  priority: "Highest",
                  guidance: "Write every formula from memory daily. Focus hard on Conditional Probability, Bayes Theorem, Expected Value, and Variance. Practice 10 questions every other day."
                },
                {
                  topic: "Hypothesis Testing & Confidence Intervals",
                  priority: "High",
                  guidance: "Always state H0 and H1 clearly. Practice writing the conclusion sentence. Master Type I vs Type II errors. Timed practice is essential."
                },
                {
                  topic: "Forecasting & Time Series",
                  priority: "Medium",
                  guidance: "Understand when to use Moving Average vs Exponential Smoothing. Practice calculating forecasts and measuring forecast accuracy (MAD, MSE)."
                },
                {
                  topic: "Calculus & Algebra Foundations",
                  priority: "Medium",
                  guidance: "Refresh differentiation and basic integration only as needed for probability density functions. Keep it light."
                }
              ].map((item, i) => (
                <div key={i} className="bg-[#1A1410] border border-[#3A2F28] rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.topic}</h3>
                    <span className="text-xs px-2.5 py-1 bg-[#B84C3C]/20 text-[#B84C3C] rounded-full">
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-[#A38F7A]">{item.guidance}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1410] border border-[#3A2F28] rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <input
              className="w-full bg-[#221A16] border border-[#3A2F28] rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#C68E5E]"
              placeholder="What is the new task?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <div className="flex gap-3">
              <button
                onClick={addTask}
                className="flex-1 py-3 bg-[#C68E5E] hover:bg-[#B87D4F] text-white rounded-xl font-medium"
              >
                Add & Re-optimise
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 border border-[#3A2F28] rounded-xl text-[#A38F7A]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5PM REMINDER */}
      {showReminder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1410] border border-[#B84C3C]/50 rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3 text-[#B84C3C]">5:00 PM Priority Review</h3>
            <p className="text-sm text-[#A38F7A] mb-5">
              Review today&apos;s completed tasks. Decide clearly what carries forward to tomorrow. Update statuses now.
            </p>
            <button
              onClick={() => {
                setShowReminder(false);
                setActiveTab("schedule");
              }}
              className="w-full py-3 bg-[#B84C3C] hover:bg-[#A33F32] text-white rounded-xl font-medium"
            >
              Go to Schedule & Update
            </button>
          </div>
        </div>
      )}

      {/* DAILY REFLECTION */}
      {showReflection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1410] border border-[#3A2F28] rounded-3xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-5">Daily Reflection Questions</h3>
            <div className="space-y-4 text-sm text-[#A38F7A]">
              <p>1. What was my biggest win today?</p>
              <p>2. What blocked my progress the most?</p>
              <p>3. What should I carry forward to tomorrow with clear intention?</p>
              <p>4. Did I protect my deep work and CPA study blocks?</p>
              <p>5. What one thing will I do differently tomorrow?</p>
            </div>
            <button
              onClick={() => setShowReflection(false)}
              className="w-full mt-6 py-3 bg-[#C68E5E] hover:bg-[#B87D4F] text-white rounded-xl font-medium"
            >
              Close Reflection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}