import { useState, useEffect } from 'react';

// --- Custom Hook ---
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// --- Shared Constants ---
const gradeScale = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

// --- Main Application Component ---
export default function App() {
  const [activeTab, setActiveTab] = useLocalStorage('active-calc-tab', 'term');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="flex-grow p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'course' && <CourseGradeCalc />}
          {activeTab === 'term' && <TermGpaCalc />}
          {activeTab === 'cumulative' && <CumulativeGpaCalc />}
        </div>
      </main>

      <footer className="text-center py-6 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} FYEO_GPA_Calculator</p>
      </footer>
    </div>
  );
}

// --- Header & Navigation ---
function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'course', label: 'Course Grade' },
    { id: 'term', label: 'Term GPA' },
    { id: 'cumulative', label: 'Cumulative GPA' }
  ];

  return (
    <header className="bg-[#792082] border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/GPA_Calc.png" alt="FYEO Logo" className="h-20 w-auto object-contain bg-stone-300 rounded-sm" />
          <span className="text-white text-3xl font-bold text-slate-800 tracking-tight">FYEO GPA Calculator</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1 bg-slate-100 p-1 rounded-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation (Scrollable row) */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 bg-white px-2 py-2 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}

// --- 1. Course Grade Calculator (Weighted Assignments) ---
function CourseGradeCalc() {
  const [assignments, setAssignments] = useLocalStorage('course-assignments', [
    { id: crypto.randomUUID(), name: 'Midterm 1', grade: '', weight: '30' },
    { id: crypto.randomUUID(), name: 'Final Exam', grade: '', weight: '40' },
  ]);

  const updateAssignment = (id, field, value) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const addAssignment = () => {
    setAssignments([...assignments, { id: crypto.randomUUID(), name: '', grade: '', weight: '' }]);
  };

  const removeAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  // Calculations
  let totalWeight = 0;
  let earnedGrade = 0;

  assignments.forEach(a => {
    const w = parseFloat(a.weight) || 0;
    const g = parseFloat(a.grade) || 0;
    totalWeight += w;
    earnedGrade += (g * (w / 100));
  });

  const currentAverage = totalWeight > 0 ? ((earnedGrade / totalWeight) * 100).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Course Grade Calculator</h2>
        <p className="text-slate-500 text-sm">Calculate your final grade based on weighted assignments.</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Current Average</div>
            <div className="text-4xl font-bold text-[#792082]">{currentAverage}%</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Weight Entered</div>
            <div className={`text-4xl font-bold ${totalWeight > 100 ? 'text-red-500' : totalWeight === 100 ? 'text-emerald-600' : 'text-amber-500'}`}>
              {totalWeight}%
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
          <div className="col-span-6">Assignment Name</div>
          <div className="col-span-3">Grade (%)</div>
          <div className="col-span-2">Weight (%)</div>
          <div className="col-span-1"></div>
        </div>

        {assignments.map(a => (
          <div key={a.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white sm:bg-transparent p-4 sm:p-2 rounded-xl sm:rounded-none border border-slate-100 sm:border-none shadow-sm sm:shadow-none">
            <div className="sm:col-span-6">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Assignment Name</label>
              <input type="text" placeholder="e.g. Essay 1" value={a.name} onChange={(e) => updateAssignment(a.id, 'name', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
            </div>
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Grade (%)</label>
              <input type="number" placeholder="85" value={a.grade} onChange={(e) => updateAssignment(a.id, 'grade', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
            </div>
            <div className="sm:col-span-2">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Weight (%)</label>
              <input type="number" placeholder="20" value={a.weight} onChange={(e) => updateAssignment(a.id, 'weight', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
            </div>
            <div className="sm:col-span-1 flex justify-end sm:justify-center">
              <button onClick={() => removeAssignment(a.id)} disabled={assignments.length === 1} className="text-slate-400 hover:text-red-500 p-2 transition-colors disabled:opacity-30">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <button onClick={addAssignment} className="px-5 py-2.5 bg-blue-50 text-[#792082] font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
            <span>+</span> Add Assignment
          </button>
          <button onClick={() => setAssignments([{ id: crypto.randomUUID(), name: '', grade: '', weight: '' }])} className="text-sm text-slate-400 hover:text-slate-600 font-medium">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 2. Term Grade Calculator (Standard GPA) ---
function TermGpaCalc() {
  const [courses, setCourses] = useLocalStorage('term-courses', [
    { id: crypto.randomUUID(), name: '', credits: '3', grade: 'A' },
  ]);

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: '3', grade: 'A' }]);
  const removeCourse = (id) => setCourses(courses.filter(c => c.id !== id));

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(c => {
    const creds = parseFloat(c.credits) || 0;
    if (creds > 0 && c.grade) {
      totalPoints += creds * gradeScale[c.grade];
      totalCredits += creds;
    }
  });

  const termGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Term GPA Calculator</h2>
        <p className="text-slate-500 text-sm">Calculate your Grade Point Average for a single semester.</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Term GPA</div>
            <div className="text-4xl font-bold text-[#792082]">{termGPA}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Credits</div>
            <div className="text-4xl font-bold text-slate-700">{totalCredits}</div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
          <div className="col-span-5">Course Name</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-3">Grade</div>
          <div className="col-span-1"></div>
        </div>

        {courses.map(c => (
          <div key={c.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white sm:bg-transparent p-4 sm:p-2 rounded-xl sm:rounded-none border border-slate-100 sm:border-none shadow-sm sm:shadow-none">
            <div className="sm:col-span-5">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Course</label>
              <input type="text" placeholder="e.g. Calculus I" value={c.name} onChange={(e) => updateCourse(c.id, 'name', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Credits</label>
              <input type="number" min="0" step="0.5" value={c.credits} onChange={(e) => updateCourse(c.id, 'credits', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Grade</label>
              <select value={c.grade} onChange={(e) => updateCourse(c.id, 'grade', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                {Object.keys(gradeScale).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="sm:col-span-1 flex justify-end sm:justify-center">
              <button onClick={() => removeCourse(c.id)} disabled={courses.length === 1} className="text-slate-400 hover:text-red-500 p-2 transition-colors disabled:opacity-30">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <button onClick={addCourse} className="px-5 py-2.5 bg-blue-50 text-[#792082] font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
            <span>+</span> Add Course
          </button>
          <button onClick={() => setCourses([{ id: crypto.randomUUID(), name: '', credits: '3', grade: 'A' }])} className="text-sm text-slate-400 hover:text-slate-600 font-medium">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. Cumulative GPA Calculator (Past + Current) ---
function CumulativeGpaCalc() {
  // We keep past state and current semester state
  const [pastData, setPastData] = useLocalStorage('cumulative-past', { credits: '', gpa: '' });
  const [courses, setCourses] = useLocalStorage('cumulative-courses', [
    { id: crypto.randomUUID(), name: '', credits: '3', grade: 'A' },
  ]);

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addCourse = () => setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: '3', grade: 'A' }]);
  const removeCourse = (id) => setCourses(courses.filter(c => c.id !== id));

  // Math
  const priorCreds = parseFloat(pastData.credits) || 0;
  const priorGpa = parseFloat(pastData.gpa) || 0;
  const pastPoints = priorCreds * priorGpa;

  let newPoints = 0;
  let newCreds = 0;

  courses.forEach(c => {
    const creds = parseFloat(c.credits) || 0;
    if (creds > 0 && c.grade) {
      newPoints += creds * gradeScale[c.grade];
      newCreds += creds;
    }
  });

  const totalCreds = priorCreds + newCreds;
  const totalPoints = pastPoints + newPoints;
  const currentTermGpa = newCreds > 0 ? (newPoints / newCreds).toFixed(2) : '0.00';
  const cumulativeGPA = totalCreds > 0 ? (totalPoints / totalCreds).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Top Results Section */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cumulative GPA Calculator</h2>
        <p className="text-slate-500 text-sm">See how your current semester impacts your overall standing.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#792082] p-4 rounded-xl border border-black shadow-md text-white col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-white mb-1">New Cumulative GPA</div>
            <div className="text-4xl font-bold">{cumulativeGPA}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">This Term's GPA</div>
            <div className="text-3xl font-bold text-slate-800">{currentTermGpa}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Total Credits (All)</div>
            <div className="text-3xl font-bold text-slate-800">{totalCreds}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Col: Past Data */}
        <div className="p-6 sm:p-8 md:col-span-4 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
          <h3 className="text-lg font-bold text-slate-800 mb-4">1. Prior Academic History</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">Previous Total Credits</label>
              <input 
                type="number" min="0" step="0.5" placeholder="e.g. 60" 
                value={pastData.credits} 
                onChange={(e) => setPastData({...pastData, credits: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">Previous Cumulative GPA</label>
              <input 
                type="number" min="0" max="4.0" step="0.01" placeholder="e.g. 3.25" 
                value={pastData.gpa} 
                onChange={(e) => setPastData({...pastData, gpa: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Right Col: Current Courses */}
        <div className="p-6 sm:p-8 md:col-span-8 bg-slate-50/30">
          <h3 className="text-lg font-bold text-slate-800 mb-4">2. Current Semester Courses</h3>
          
          <div className="space-y-3">
            {courses.map(c => (
              <div key={c.id} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="col-span-5 sm:col-span-5">
                  <input type="text" placeholder="Course" value={c.name} onChange={(e) => updateCourse(c.id, 'name', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <input type="number" min="0" step="0.5" placeholder="Cr" value={c.credits} onChange={(e) => updateCourse(c.id, 'credits', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <select value={c.grade} onChange={(e) => updateCourse(c.id, 'grade', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none appearance-none">
                    {Object.keys(gradeScale).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeCourse(c.id)} disabled={courses.length === 1} className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4">
            <button onClick={addCourse} className="text-sm px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              + Add Another Course
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}