"use client";

import React, { useState } from 'react';

export default function XPProductivityHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'cpa' | 'add'>('dashboard');
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const [schedule, setSchedule] = useState([
    {
      id: 'b1', time: '5:45am', duration: '15 min', title: 'Wake Up & Mental Priming', category: 'Personal',
      status: 'Not started', preview: 'Wake up, hydrate, and prime your mind for high-performance execution.',
      eisenhower: 'Important but Not Urgent'
    },
    {
      id: 'b2', time: '6:00am', duration: '45 min', title: 'CPA Formula Mastery & Active Recall', category: 'CPA',
      status: 'Not started', preview: 'Deep active recall of key formulae in Probability and Statistics.',
      eisenhower: 'Important but Not Urgent'
    },
    {
      id: 'b6', time: '9:00am', duration: '90 min', title: 'Deep Work Block 1 — Closing Client Work Paper', category: 'Audit',
      status: 'Not started', preview: 'High-focus execution on Bank Reconciliation for the closing client.',
      eisenhower: 'Urgent & Important'
    }
  ]);

  const [newTaskName, setNewTaskName] = useState('');
  const completedTasks = schedule.filter((b: any) => b.status === 'Done').length;
  const totalTasks = schedule.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const updateStatus = (id: string, newStatus: string) => {
    setSchedule(schedule.map((b: any) => b.id === id ? { ...b, status: newStatus } : b));
  };

  const deleteTask = (id: string) => {
    if (confirm('Delete this task?')) {
      setSchedule(schedule.filter((b: any) => b.id !== id));
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedBlock(expandedBlock === id ? null : id);
  };

  const addNewTask = () => {
    if (!newTaskName.trim()) return;
    alert(`New task added: "${newTaskName}". Schedule re-optimised.`);
    setNewTaskName('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0A08] text-[#F5EDE4]">
      <nav className="bg-[#1A1410] border-b border-[#3A2F28] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C68E5E] to-[#B84C3C] flex items-center justify-center">
              <span className="font-bold text-xl">XP</span>
            </div>
            <div>
              <div className="font-semibold text-2xl">XP Productivity Hub</div>
              <div className="text-xs text-[#A38F7A] -mt-1">Audit + CPA Daily Command Centre</div>
            </div>
          </div>

          <div className="flex gap-2">
            {['dashboard', 'schedule', 'cpa', 'add'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-[#C68E5E] text-white' : 'bg-[#221A16] text-[#A38F7A]'}`}
              >
                {tab === 'cpa' ? 'CPA Tracker' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="premium-card rounded-3xl p-10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[#C68E5E] text-sm tracking-[2px]">GOOD AFTERNOON, CHRIS</div>
                  <h1 className="text-6xl font-semibold tracking-tighter mt-2">XP Productivity Hub</h1>
                  <p className="text-xl text-[#A38F7A] mt-3">An intelligent system designed to help you execute at a higher level every day.</p>
                </div>
                <div className="text-right">
                  <div className="text-7xl font-bold text-[#C68E5E]">{progressPercentage}</div>
                  <div className="text-sm text-[#A38F7A] -mt-2">EFFICIENCY SCORE</div>
                </div>
              </div>
            </div>

            <div className="premium-card rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-[#C68E5E] text-sm tracking-widest">TODAY'S PROGRESS</div>
                  <div className="text-3xl font-semibold mt-1">{completedTasks} of {totalTasks} tasks completed</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#C68E5E]">{progressPercentage}%</div>
                </div>
              </div>
              <div className="w-full bg-[#221A16] rounded-full h-3">
                <div className="bg-[#C68E5E] h-3 rounded-full transition-all" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 premium-card rounded-3xl p-8">
                <div className="text-[#C68E5E] text-xs tracking-[3px] mb-3">TODAY'S MISSION BRIEF</div>
                <p className="text-lg">Use your morning peak energy on closing client work. Protect the 8:00pm CPA block. Finish the day with clarity and respect your 11:00pm bedtime.</p>
              </div>
              <div className="premium-card rounded-3xl p-8 border border-[#B84C3C]">
                <div className="text-[#B84C3C] text-xs tracking-[3px] mb-3">5PM PRIORITY CHECK</div>
                <p className="text-sm mb-4">Review what was completed and decide what moves to tomorrow with clear intention.</p>
                <button onClick={() => setShowReminder(true)} className="w-full py-3 bg-[#B84C3C] text-white rounded-2xl text-sm font-medium">Open 5pm Priority Review</button>
              </div>
            </div>

            <button onClick={() => setShowReflection(true)} className="w-full py-4 bg-[#221A16] hover:bg-[#2A211C] rounded-3xl text-sm font-medium border border-[#3A2F28]">
              Open Daily Reflection Questions
            </button>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-4xl font-semibold">Today's Execution Schedule</h2>
              <button onClick={() => setShowAddModal(true)} className="btn-primary px-6 py-3 rounded-2xl">+ Add New Task</button>
            </div>

            <div className="space-y-4">
              {schedule.map((block: any) => (
                <div key={block.id} className="premium-card rounded-3xl overflow-hidden">
                  <div className="px-7 py-6 flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(block.id)}>
                    <div>
                      <div className="font-semibold text-xl flex items-center gap-3">
                        {block.time} — {block.title}
                        <span className="text-xs px-3 py-1 bg-[#3A2F28] rounded-full">{block.eisenhower}</span>
                      </div>
                      <div className="text-[#A38F7A] mt-1">{block.preview}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select value={block.status} onChange={(e) => updateStatus(block.id, e.target.value)} className="bg-[#221A16] border border-[#3A2F28] px-4 py-2 rounded-xl text-sm" onClick={e => e.stopPropagation()}>
                        <option>Not started</option>
                        <option>In progress</option>
                        <option>Done</option>
                        <option>Moved</option>
                        <option>Skipped</option>
                      </select>
                      <button onClick={(e) => { e.stopPropagation(); openEdit(block); }} className="text-[#C68E5E] hover:text-white text-sm">Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteTask(block.id); }} className="text-[#B84C3C] hover:text-white text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CPA TRACKER */}
        {activeTab === 'cpa' && (
          <div className="premium-card rounded-3xl p-8">
            <h2 className="text-3xl font-semibold mb-6">CPA Quantitative Techniques — Deep Study System</h2>
            <div className="space-y-6">
              {[
                { topic: "Statistics & Probability", focus: "Highest", guidance: "Write formulae from memory daily. Focus on Conditional Probability and Expected Value." },
                { topic: "Hypothesis Testing & Confidence Intervals", focus: "High", guidance: "Practice stating conclusions clearly. Always link your decision back to the null hypothesis." },
                { topic: "Forecasting & Time Series", focus: "Medium", guidance: "Understand when to use each method. Practice calculating forecasts and measuring accuracy." }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-[#221A16] rounded-2xl">
                  <div className="flex justify-between mb-3">
                    <div className="font-semibold text-xl">{item.topic}</div>
                    <div className="text-xs px-4 py-1 bg-[#B84C3C] rounded-full">{item.focus} Priority</div>
                  </div>
                  <div className="text-sm text-[#A38F7A]"><strong>How to study:</strong> {item.guidance}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD TASK MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="premium-card rounded-3xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-6">Add New Task</h3>
              <input className="w-full bg-[#221A16] border border-[#3A2F28] rounded-2xl px-5 py-4 mb-4" placeholder="Task name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
              <button onClick={addNewTask} className="btn-primary w-full py-4 rounded-2xl">Add & Re-optimise</button>
              <button onClick={() => setShowAddModal(false)} className="w-full py-3 mt-3 text-[#A38F7A]">Cancel</button>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="premium-card rounded-3xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-6">Edit Task</h3>
              <input className="w-full bg-[#221A16] border border-[#3A2F28] rounded-2xl px-5 py-3 mb-3" placeholder="Task title" />
              <div className="flex gap-3">
                <button onClick={() => setShowEditModal(false)} className="btn-primary flex-1 py-3 rounded-2xl">Save Changes</button>
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 rounded-2xl border border-[#3A2F28]">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* 5PM REMINDER */}
        {showReminder && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="premium-card rounded-3xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#B84C3C]">5:00 PM Priority Review</h3>
              <p className="mb-6 text-sm">Review what was completed today. Decide clearly what moves to tomorrow.</p>
              <button onClick={() => setShowReminder(false)} className="btn-primary w-full py-3 rounded-2xl">Close Reminder</button>
            </div>
          </div>
        )}

        {/* DAILY REFLECTION */}
        {showReflection && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="premium-card rounded-3xl p-8 w-full max-w-lg">
              <h3 className="text-2xl font-semibold mb-6">Daily Reflection Questions</h3>
              <div className="space-y-5 text-sm">
                <div>1. What was my biggest win today?</div>
                <div>2. What blocked my progress the most?</div>
                <div>3. What should I carry forward to tomorrow with clear intention?</div>
                <div>4. Did I protect my deep work and CPA study blocks?</div>
                <div>5. What one thing will I do differently tomorrow?</div>
              </div>
              <button onClick={() => setShowReflection(false)} className="btn-primary w-full py-3 rounded-2xl mt-8">Close Reflection</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}