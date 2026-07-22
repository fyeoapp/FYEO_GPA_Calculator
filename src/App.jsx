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

// --- Shared Constants (TMU 4.33 Scale) ---
const gradeScale = {
  'A+ (90-100)': 4.33, 'A (85-89)': 4.00, 'A- (80-84)': 3.67,
  'B+ (77-79)': 3.33, 'B (73-76)': 3.00, 'B- (70-72)': 2.67,
  'C+ (67-69)': 2.33, 'C (63-66)': 2.00, 'C- (60-62)': 1.67,
  'D+ (57-59)': 1.33, 'D (53-56)': 1.00, 'D- (50-52)': 0.67,
  'F (0-49)': 0.00,
};

// --- Panel Links Data ---
// Update the 'url' property when you have your actual links ready
const leftPanelLinks = [
  { id: 'l1', label: 'GPA Guidelines', url: 'https://www.torontomu.ca/current-students/grades-standings/gpa-calculation/' },
  { id: 'l2', label: 'Policy 170', url: 'https://www.torontomu.ca/senate/policies/undergraduate-course-grading-academic-program-standing-and-eligibility-to-graduate-policy-170-a/' },
  { id: 'l3', label: 'Grades & Standing', url: 'https://www.torontomu.ca/current-students/grades-standings/' },
  { id: 'l4', label: 'FYEO Workload Calendar', url: 'https://docs.google.com/spreadsheets/d/1UijWrlEXq02mC5hFObBCJ64sN8DGW22D3AFSqXCABBk/edit?pli=1&gid=1592973167&authuser=0#gid=1592973167' },
];

const leftPanelSecondaryLinks = [
  { id: 'ls1', label: 'Engineering ACES', url: 'https://www.torontomu.ca/first-year-engineering-office/academic-support/engineering-aces/' },
  { id: 'ls2', label: 'SLLS Math Tutoring', url: 'https://www.torontomu.ca/student-life-and-learning/learning-support/math-support/' },
  { id: 'ls3', label: 'OneNote Tutorial', url: 'https://www.youtube.com/watch?v=gEh5bCdIyP8' },
  { id: 'ls4', label: 'FYEO Exam Tips', url: 'https://www.torontomu.ca/first-year-engineering-office/academic-support/student-learning-support/' },
  { id: 'ls5', label: 'Youtube Step-by-Step Guides', url: 'https://www.youtube.com/playlist?list=PL81FaJT60qwfXpTbXWY0LCbeONVzfpEmj' },
];

const rightPanelLinks = [
  { id: 'r1', label: 'Book an Advising Appointment', url: 'https://www.torontomu.ca/first-year-engineering-office/academic-support/academic-advising/' },
  { id: 'r2', label: 'Transition Program', url: 'https://www.torontomu.ca/engineering-architectural-science/current-students/current-undergraduate/transition-program/' },
  { id: 'r3', label: 'First-Year in Two', url: 'https://www.torontomu.ca/first-year-engineering-office/academic-support/academic-support/#:~:text=Programs%20for%20Academic%20Success&text=First%20Year%20in%20Two%20Years,courses%20over%20two%20academic%20years.' },
  { id: 'r4', label: 'FYEO Youtube', url: 'https://www.youtube.com/@FirstYearEngineeringOffice' },
];

const rightPanelSecondaryLinks = [
  { id: 'rs1', label: 'Student Handbook', url: 'https://www.torontomu.ca/first-year-engineering-office/current-students/eng-handbook/' },
  { id: 'rs2', label: 'First-Year Ambassador', url: 'https://www.torontomu.ca/first-year-engineering-office/orientation/first-year-ambassadors/' },
];


// --- Main Application Component ---
export default function App() {
  const [activeTab, setActiveTab] = useLocalStorage('active-calc-tab', 'term');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* 3-Column Layout Container */}
      <div className="flex-grow flex w-full relative mt-2">
        
        {/* Left Panel (Narrower width: w-48, reduced padding: p-4) */}
        <aside className="hidden lg:flex flex-col w-70 p-4 border-r border-slate-200 bg-[#7474c1] rounded-lg space-y-3 shrink-0">
          <h3 className="text-xl pt-2 pb-2 font-bold text-white uppercase tracking-wider mb-2">Academic Resources</h3>
          {leftPanelLinks.map(link => (
            <a key={link.id} target="_blank" rel="noopener noreferrer" href={link.url} className="px-3 py-2 bg-[#ffdc00]  border border-slate-200 rounded-lg text-md font-medium text-black hover:bg-yellow-50 hover:text-[#792082] hover:border-[#792082]/30 transition-colors shadow-sm block text-center break-words">
              {link.label}
            </a>
          ))}

          <h3 className="text-xl pt-4 pb-2 font-bold text-white uppercase tracking-wider mb-2">Study Support</h3>
          {leftPanelSecondaryLinks.map(link => (
            <a key={link.id} target="_blank" rel="noopener noreferrer" href={link.url} className="px-3 py-2 bg-[#d9d9d9]  border border-slate-200 rounded-lg text-md font-medium text-black hover:bg-yellow-50 hover:text-[#792082] hover:border-[#792082]/30 transition-colors shadow-sm block text-center break-words">
              {link.label}
            </a>
          ))}

         <img src="./FYEO_Logo_Black.png" alt="Feedback" className="w-full h-auto mt-4 object-contain border rounded-lg bg-white border-slate-700 shadow-md" />

        </aside>

        {/* Main Calculator Content */}
        <main className="flex-grow p-4 sm:p-8 overflow-x-hidden ">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'course' && <CourseGradeCalc />}
            {activeTab === 'term' && <TermGpaCalc />}
            {activeTab === 'cumulative' && <CumulativeGpaCalc />}
          </div>
        </main>

        {/* Right Panel (Narrower width: w-48, reduced padding: p-4) */}
        <aside className="hidden lg:flex flex-col w-72 p-4 border-l border-slate-200 bg-[#7474c1] rounded-lg space-y-3 shrink-0">
          <h3 className="text-xl pt-2 pb-2 font-bold text-white uppercase tracking-wider mb-2">Academic Support</h3>
          {rightPanelLinks.map(link => (
            <a key={link.id} target="_blank" rel="noopener noreferrer" href={link.url} className="px-3 py-2 bg-[#ffdc00] border border-slate-200 rounded-lg text-md font-medium text-black hover:bg-yellow-50 hover:text-[#792082] hover:border-[#792082]/30 transition-colors shadow-sm block text-center break-words">
              {link.label}
            </a>
          ))}
                    
          <h3 className="text-xl pt-4 pb-2 font-bold text-white uppercase tracking-wider mb-2">Additional Support</h3>
          {rightPanelSecondaryLinks.map(link => (
            <a key={link.id} target="_blank" rel="noopener noreferrer" href={link.url} className="px-3 py-2 bg-[#d9d9d9]  border border-slate-200 rounded-lg text-md font-medium text-black hover:bg-yellow-50 hover:text-[#792082] hover:border-[#792082]/30 transition-colors shadow-sm block text-center break-words">
              {link.label}
            </a>
          ))}

          {/* NEW: Mobile App Store Download Badges */}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">Download Our App</h3>
            <div className="grid grid-cols-2 gap-2">
              {/* Google Play / Android Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.fyengtmu.fyeng&pcampaignid=web_share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <img 
                  src="./GetItOnGooglePlay_Badge_Web_color_English.svg" 
                  alt="Get it on Google Play" 
                  className="w-full h-10 object-contain"
                />
              </a>

              {/* App Store / iOS Button */}
              <a 
                href="https://apps.apple.com/ca/app/fyeng-mobile/id6749859039" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <img 
                  src="./Black_logo_app_store.svg" 
                  alt="Download on the App Store" 
                  className="w-full h-10 object-contain"
                />
              </a>
            </div>
          </div>
          
          {/* NEW: Feedback Card */}
          <div className="mt-4 bg-yellow-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-1">
              We Value Your Feedback!
            </h3>
            <p className="text-[13px] text-slate-700 mb-3 leading-tight">
              Help us improve the Calculator by sharing your thoughts.
            </p>
            <button 
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfS4v2l6lEqOK0W6YOXI9i7LfQWM0HXT0mshs7-waxhV2aeRQ/viewform?usp=publish-editor', '_blank')} 
              className="px-3 py-2 bg-[#ffdc00] text-black text-[13px] font-bold rounded-lg hover:bg-[#e6c500] transition-colors shadow-sm w-full"
            >
              Share Feedback
            </button>
          </div>


        </aside>

      </div>

      <footer className="text-center py-3 text-black text-sm border-t border-slate-200 mt-auto">
        <p>© {new Date().getFullYear()} FYEO_GPA_Calculator</p>
      </footer>
    </div>
  );
}

// --- Header & Navigation ---
function Header({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const tabs = [
    { id: 'course', label: 'Course Grade' },
    { id: 'term', label: 'Term GPA' },
    { id: 'cumulative', label: 'Cumulative GPA' }
  ];

  return (
    <header className="bg-[#792082] border-b border-[#792082]/80 sticky top-0 z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
      
        {/* Logo & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1.5 -ml-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Open Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <img src="./GPA_Calc.png" alt="FYEO Logo" className="h-14 sm:h-14 md:h-20 w-auto object-contain shadow-lg" />
          <span className="text-white text-2xl sm:text-xl md:text-3xl font-bold tracking-tight">FYEO GPA Calculator</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-items-end space-x-1 bg-black/15 p-1 rounded-lg backdrop-blur-sm shadow-inner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-m transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-[#ffdc00] text-black shadow-md'
                  : 'text-white bg-white/20 hover:text-white hover:bg-white/30' 
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>


        <div className="hidden lg:flex items-center gap-4">  
          {/* Video Tutorial Icon */}
          <a 
            href="https://www.youtube.com/watch?app=desktop&v=Jlcl2eeZFPI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-[#ffdc00] transition-transform hover:scale-110 flex flex-col items-center justify-center gap-1"
            title="Watch Video Tutorial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25l4.5 3-4.5 3v-6Z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wider uppercase">Tutorial</span>
          </a>
        </div>

      </div>

      {/* Mobile Navigation (Scrollable row) */}
      <div className="md:hidden flex overflow-x-auto border-t border-white/10 bg-[#792082] px-2 py-2 hide-scrollbar shadow-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-[#ffdc00] text-black shadow-sm' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Side Panel (Overlay Menu) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Dark transparent backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Slide-out Menu Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#7474c1] shadow-2xl h-full transform transition-transform">
            <div className="px-4 h-16 flex items-center justify-between border-b border-slate-200 bg-[#792082]">
              <span className="font-bold text-lg text-white">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-white hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 h-0 overflow-y-auto p-4 space-y-6">
              {/* Left Panel Links rendered in Mobile View */}
              <div>
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">Campus Links</h3>
                <div className="flex flex-col space-y-2">
                  {leftPanelLinks.map(link => (
                    <a key={link.id} href={link.url} className="px-4 py-2.5 bg-[#ffdc00] border border-slate-200 rounded-lg text-sm font-medium text-black hover:bg-blue-50 hover:text-[#792082] transition-colors block">
                      {link.label}
                    </a>
                  ))}
                </div>

                <h3 className="text-md font-bold text-white uppercase tracking-wider mt-6 mb-3">More Resources</h3>
                <div className="flex flex-col space-y-2">
                  {leftPanelSecondaryLinks.map(link => (
                    <a key={link.id} href={link.url} className="px-4 py-2.5 bg-[#d9d9d9] border border-slate-200 rounded-lg text-sm font-medium text-black hover:bg-blue-50 hover:text-[#792082] transition-colors block">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Right Panel Links rendered in Mobile View */}
              <div>
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">Student Resources</h3>
                <div className="flex flex-col space-y-2">
                  {rightPanelLinks.map(link => (
                    <a key={link.id} href={link.url} className="px-4 py-2.5 bg-[#ffdc00] border border-slate-200 rounded-lg text-sm font-medium text-black hover:bg-blue-50 hover:text-[#792082] transition-colors block">
                      {link.label}
                    </a>
                  ))}
                </div>

                <h3 className="text-md font-bold text-white uppercase tracking-wider mt-6 mb-3">Additional Support</h3>
                <div className="flex flex-col space-y-2">
                  {rightPanelSecondaryLinks.map(link => (
                    <a key={link.id} href={link.url} className="px-4 py-2.5 bg-[#d9d9d9] border border-slate-200 rounded-lg text-sm font-medium text-black hover:bg-blue-50 hover:text-[#792082] transition-colors block">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Video Tutorial Link */}
               <div className="border-t border-slate-200 pt-6">
                <a href="https://www.youtube.com/watch?app=desktop&v=Jlcl2eeZFPI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-xl shadow-md">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#ffdc00]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25l4.5 3-4.5 3v-6Z" />
                  </svg>
                  <span className="font-bold">Watch Video Tutorial</span>
                </a>
              </div>

              {/* Mobile App Store Badges */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">Download Our App</h3>
                <div className="grid grid-cols-2 gap-2">
                  <a href="https://play.google.com/store/apps/details?id=com.fyengtmu.fyeng&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                    <img src="./GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Google Play" className="h-10 object-contain" />
                  </a>
                  <a href="https://apps.apple.com/ca/app/fyeng-mobile/id6749859039" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                    <img src="./Black_logo_app_store.svg" alt="App Store" className="h-10 object-contain" />
                  </a>
                </div>
              </div>

              <button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfS4v2l6lEqOK0W6YOXI9i7LfQWM0HXT0mshs7-waxhV2aeRQ/viewform?usp=publish-editor', '_blank')} className="px-2 py-1.5 bg-[#ffdc00] text-black text-[13px] font-semibold rounded-lg hover:bg-[#e6c500] transition-colors shadow-sm w-full">
                Share Feedback
              </button>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// --- 1. Course Grade Calculator (Weighted Assignments) ---
function CourseGradeCalc() {
  const [targetGrade, setTargetGrade] = useLocalStorage('course-target', '');
  const [assignments, setAssignments] = useLocalStorage('course-assignments', [
    { id: crypto.randomUUID(), name: 'Assignment', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Quizzes', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Tutorials', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Labs', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Projects', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Midterms', grade: '', weight: '' },
    { id: crypto.randomUUID(), name: 'Final Exam', grade: '', weight: '' },
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
    // Only calculate if both a weight AND a grade are entered
    if (a.weight !== '' && a.grade !== '') {
      totalWeight += w;
      earnedGrade += (g * (w / 100));
    } else if (a.weight !== '') {
      // If only weight is entered, we track it for the "remaining" math, but don't add to earned grade
      totalWeight += w; 
    }
  });

  // Calculate current average based only on completed assignments
  let completedWeight = 0;
  assignments.forEach(a => {
    if (a.weight !== '' && a.grade !== '') {
      completedWeight += parseFloat(a.weight);
    }
  });

  const currentAverage = completedWeight > 0 ? ((earnedGrade / completedWeight) * 100).toFixed(2) : '0.00';

  // Target Math
  const target = parseFloat(targetGrade);
  const remainingWeight = 100 - completedWeight;
  let requiredAverage = null;
  let targetMessage = null;
  let messageStyle = "bg-blue-50 text-blue-800 border-blue-200";

  if (!isNaN(target) && targetGrade.toString().trim() !== '') {
    if (remainingWeight <= 0) {
      if (parseFloat(currentAverage) >= target) {
        targetMessage = `Course complete! You achieved your target with a ${currentAverage}%. 🎉`;
        messageStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
      } else {
        targetMessage = `Course complete. You finished with a ${currentAverage}%, falling short of your ${target}% target.`;
        messageStyle = "bg-slate-100 text-slate-600 border-slate-200";
      }
    } else {
      // Formula: (Target - Earned) / Remaining Weight * 100
      requiredAverage = ((target - earnedGrade) / remainingWeight) * 100;
      
      if (requiredAverage > 100) {
        targetMessage = `It is mathematically impossible to reach your target of ${target}%. You would need to average ${requiredAverage.toFixed(1)}% on your remaining assignments.`;
        messageStyle = "bg-red-50 text-red-800 border-red-200";
      } else if (requiredAverage <= 0) {
        targetMessage = `You have already secured your target of ${target}%! Even if you score 0 on the rest, you pass your goal. 🎉`;
        messageStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
      } else {
        targetMessage = `To reach your overall goal of ${target}%, you need to average ${requiredAverage.toFixed(1)}% across your remaining ${remainingWeight}% of course weight.`;
        messageStyle = "bg-amber-50 text-amber-800 border-amber-200";
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
      <p className="text-slate-400 text-sm mb-2">Note: For passing course please ensure you meet the minimum requirements.</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Course Grade Calculator</h2>
            <p className="text-slate-500 text-sm">Calculate your final grade and plan for future assignments.</p>
          </div>
          
          {/* Target Input */}
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
            <label className="text-sm font-bold text-slate-700 whitespace-nowrap">Target Grade %</label>
            <input 
              type="number" 
              placeholder="e.g. 85" 
              value={targetGrade} 
              onChange={(e) => setTargetGrade(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="w-23 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center focus:ring-2 focus:ring-[#792082] outline-none font-semibold text-[#792082]" 
            />
          </div>
        </div>
        
        {/* Dynamic Target Message */}
        {targetGrade && (
          <div className={`mt-4 p-3 rounded-lg border text-sm font-medium ${messageStyle}`}>
            {targetMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Current Average</div>
            <div className="text-2xl sm:text-4xl font-bold text-[#792082]">{currentAverage}%</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-1">Completed Weight</div>
            <div className={`text-2xl sm:text-4xl font-bold ${completedWeight > 100 ? 'text-red-500' : completedWeight === 100 ? 'text-emerald-600' : 'text-slate-700'}`}>
              {completedWeight}%
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 items-end pb-1">
          
          <div className="col-span-5 flex flex-col">
            <span className="text-lg normal-case tracking-normal">Assignment Name</span>
            <span className="text-[12px] normal-case tracking-normal font-medium text-slate-400 mt-0.5">
              (Enter your assignment name below)
            </span>
          </div>
          
          <div className="col-span-3 flex flex-col">
            <span className="text-lg normal-case tracking-normal">Grade (%)</span>
            <span className="text-[12px] normal-case tracking-normal font-medium text-slate-400 mt-0.5">
              (Enter your grade below)
            </span>
          </div>
          
          <div className="col-span-3 flex flex-col">
            <span className="text-lg normal-case tracking-normal">Weight (%)</span>
            <span className="text-[12px] normal-case tracking-normal font-medium text-slate-400 mt-0.5">
              (Enter your weight below)
            </span>
          </div>
          
          <div className="col-span-1"></div>
          
        </div>

        {assignments.map(a => (
          <div key={a.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white sm:bg-transparent p-4 sm:p-2 rounded-xl sm:rounded-none border border-slate-100 sm:border-none shadow-sm sm:shadow-none">
            
            <div className="sm:col-span-5">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Assignment Name</label>
              <input 
                type="text" 
                value={a.name} 
                onChange={(e) => updateAssignment(a.id, 'name', e.target.value)} 
                onFocus={(e) => e.target.select()}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none transition-all" 
              />
            </div>
            
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Grade (%)</label>
              <input 
                type="number" 
                value={a.grade} 
                placeholder="-"
                onChange={(e) => updateAssignment(a.id, 'grade', e.target.value)} 
                onFocus={(e) => e.target.select()}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none transition-all" 
              />
            </div>
            
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-slate-500 mb-1 block font-medium">Weight (%)</label>
              <input 
                type="number" 
                value={a.weight} 
                onChange={(e) => updateAssignment(a.id, 'weight', e.target.value)} 
                onFocus={(e) => e.target.select()}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none transition-all" 
              />
            </div>
            
            <div className="sm:col-span-1 flex justify-end sm:justify-center">
              <button 
                onClick={() => removeAssignment(a.id)} 
                disabled={assignments.length === 1} 
                className="text-slate-400 hover:text-red-500 p-2 transition-colors disabled:opacity-30"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-between items-center border-t border-slate-100">
          <button onClick={addAssignment} className="px-5 py-2.5 bg-blue-50 text-[#792082] font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
            <span>+</span> Add Row
          </button>
          <button 
            onClick={() => {
              setTargetGrade('');
              setAssignments([
                { id: crypto.randomUUID(), name: 'Assignment', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Quizzes', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Tutorials', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Labs', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Projects', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Midterms', grade: '', weight: '' },
                { id: crypto.randomUUID(), name: 'Final Exam', grade: '', weight: '' },
              ]);
            }} 
            className="text-sm text-slate-400 hover:text-slate-600 font-medium"
          >
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
    { id: crypto.randomUUID(), name: '', credits: '1', percentage: '', letter: '-' },
  ]);
  const [showResults, setShowResults] = useLocalStorage('term-show-results', false);

// TMU Percentage to Letter Grade Conversion
  const calculateLetter = (percent) => {
    if (percent >= 90) return 'A+ (90-100)';
    if (percent >= 85) return 'A (85-89)';
    if (percent >= 80) return 'A- (80-84)';
    if (percent >= 77) return 'B+ (77-79)';
    if (percent >= 73) return 'B (73-76)';
    if (percent >= 70) return 'B- (70-72)';
    if (percent >= 67) return 'C+ (67-69)';
    if (percent >= 63) return 'C (63-66)';
    if (percent >= 60) return 'C- (60-62)';
    if (percent >= 57) return 'D+ (57-59)';
    if (percent >= 53) return 'D (53-56)';
    if (percent >= 50) return 'D- (50-52)';
    return 'F (0-49)';
  };

  const updateCourse = (id, field, value) => {
    setShowResults(false); // Hide results if they start changing inputs again
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    setShowResults(false);
    setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: '1', percentage: '', letter: '-' }]);
  };
  
  const removeCourse = (id) => {
    setShowResults(false);
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleCalculate = () => {
    // Convert all percentages to letters first
    const updatedCourses = courses.map(c => {
      const pct = parseFloat(c.percentage);
      return {
        ...c,
        letter: !isNaN(pct) ? calculateLetter(pct) : '-'
      };
    });
    setCourses(updatedCourses);
    setShowResults(true);
  };

  // Math (Only runs if showResults is true)
  let totalPoints = 0;
  let totalCredits = 0;

  if (showResults) {
    courses.forEach(c => {
      const creds = parseFloat(c.credits) || 0;
      if (creds > 0 && c.letter !== '-') {
        totalPoints += creds * gradeScale[c.letter];
        totalCredits += creds;
      }
    });
  }

  const termGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Term GPA Calculator</h2>
            <p className="text-slate-500 text-sm">Enter your percentages to calculate your term GPA.</p>
          </div>
          <button 
            onClick={handleCalculate} 
            className="w-full sm:w-auto px-6 py-3 bg-[#ffdc00] text-black font-semibold rounded-xl shadow-md hover:bg-[#e6c500] transition-colors"
          >
            Calculate Term GPA
          </button>
        </div>
        
        {/* Results only show after clicking Calculate */}
        {showResults && (
          <div className="grid grid-cols-2 gap-4 mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-1">Term GPA</div>
              <div className="text-4xl font-bold text-[#792082]">{termGPA}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-1">Total Credits</div>
              <div className="text-4xl font-bold text-slate-700">{totalCredits}</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 items-end pb-1">
          <div className="col-span-4 flex flex-col">
            <span className="text-sm md:text-base normal-case tracking-normal font-bold text-slate-700">Course Name</span>
            <span className="text-[10px] md:text-[11px] normal-case tracking-normal font-medium text-slate-400 mt-0.5 leading-tight">
              (Enter your course name)
            </span>
          </div>
          
          <div className="col-span-2 flex flex-col">
            <span className="text-sm md:text-base normal-case tracking-normal font-bold text-slate-700">Credits</span>
            <span className="text-[10px] md:text-[11px] normal-case tracking-normal font-medium text-slate-400 mt-0.5 leading-tight">
              (Billing units)
            </span>
          </div>
          
          <div className="col-span-3 flex flex-col">
            <span className="text-sm md:text-base normal-case tracking-normal font-bold text-slate-700">Percentage (%)</span>
            <span className="text-[10px] md:text-[11px] normal-case tracking-normal font-medium text-slate-400 mt-0.5 leading-tight">
              (Enter your percentage)
            </span>
          </div>

          <div className="col-span-2 flex flex-col items-center">
            <span className="text-sm md:text-base normal-case tracking-normal font-bold text-slate-700">Letter</span>
            <span className="text-[10px] md:text-[11px] normal-case tracking-normal font-medium text-slate-400 mt-0.5 leading-tight text-center">
              (Calculated)
            </span>
          </div>
          
          <div className="col-span-1"></div>
          
        </div>

        {courses.map(c => (
          <div key={c.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white sm:bg-transparent p-4 sm:p-2 rounded-xl sm:rounded-none border border-slate-100 sm:border-none shadow-sm sm:shadow-none">
            <div className="sm:col-span-4">
              <label className="sm:hidden text-xs text-black mb-1 block font-medium">Course Name</label>
              <label className="sm:hidden text-[10px] text-slate-500 mb-1 block font-medium">(Enter your course name)</label>
              <input type="text" placeholder="Course" value={c.name} onChange={(e) => updateCourse(c.id, 'name', e.target.value)} onFocus={(e) => e.target.select()} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="sm:hidden text-xs text-black mb-1 block font-medium">Credits</label>
              <label className="sm:hidden text-[10px] text-slate-500 mb-1 block font-medium">(Billing units)</label>
              <input type="number" min="0" step="0.5" value={c.credits} onChange={(e) => updateCourse(c.id, 'credits', e.target.value)} onFocus={(e) => e.target.select()} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="sm:hidden text-xs text-black mb-1 block font-medium">Percentage (%)</label>
              <label className="sm:hidden text-[10px] text-slate-500 mb-1 block font-medium">(Enter your percentage)</label>  
              <input type="number" placeholder="e.g. 85" value={c.percentage} onChange={(e) => updateCourse(c.id, 'percentage', e.target.value)} onFocus={(e) => e.target.select()} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] focus:bg-white outline-none" />
            </div>
            <div className="sm:col-span-2 flex items-center justify-center">
              <span className={`text-xl font-bold ${c.letter !== '-' ? 'text-[#792082]' : 'text-slate-300'}`}>
                {/* This splits "A+ (90-100)" at the space and only displays "A+" */}
                {c.letter !== '-' ? c.letter.split(' ')[0] : '-'}
              </span>
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
          <button 
            onClick={() => {
              setShowResults(false);
              setCourses([{ id: crypto.randomUUID(), name: '', credits: '1', percentage: '', letter: '-' }]);
            }} 
            className="text-sm text-slate-400 hover:text-slate-600 font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. Cumulative GPA Calculator (Past + Current) ---
function CumulativeGpaCalc() {
  const [pastData, setPastData] = useLocalStorage('cumulative-past', { credits: '', gpa: '' });
  const [courses, setCourses] = useLocalStorage('cumulative-courses', [
    // Added isRepeat and oldGrade to state
    { id: crypto.randomUUID(), name: '', credits: '1', grade: 'A+ (90-100)', isRepeat: false, oldGrade: 'F (0-49)' },
  ]);

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addCourse = () => setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: '1', grade: 'A+ (90-100)', isRepeat: false, oldGrade: 'F (0-49)' }]);
  const removeCourse = (id) => setCourses(courses.filter(c => c.id !== id));

  // Math
  const priorCreds = parseFloat(pastData.credits) || 0;
  const priorGpa = parseFloat(pastData.gpa) || 0;
  const pastPoints = priorCreds * priorGpa;

  let newPoints = 0;
  let newCreds = 0;
  let penaltyPoints = 0; // Tracks points to subtract from old attempts

  courses.forEach(c => {
    const creds = parseFloat(c.credits) || 0;
    if (creds > 0 && c.grade) {
      newPoints += creds * gradeScale[c.grade];
      
      if (c.isRepeat) {
        // If it's a repeat, we don't add new credits to the total denominator.
        // We also need to subtract the old grade points from their past history.
        penaltyPoints += creds * (gradeScale[c.oldGrade] || 0);
      } else {
        // If not a repeat, it adds to their total credit load normally
        newCreds += creds;
      }
    }
  });

  const totalCreds = priorCreds + newCreds;
  // Combine past points + new points, minus the old attempts being replaced
  const totalPoints = pastPoints + newPoints - penaltyPoints; 
  
  // Term GPA is purely how they perform this semester (doesn't care about past replacements)
  const currentTermCreds = courses.reduce((acc, curr) => acc + (parseFloat(curr.credits) || 0), 0);
  const currentTermGpa = currentTermCreds > 0 ? (newPoints / currentTermCreds).toFixed(2) : '0.00';
  
  const cumulativeGPA = totalCreds > 0 ? Math.max(0, (totalPoints / totalCreds)).toFixed(2) : '0.00';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Top Results Section */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Cumulative GPA Calculator</h2>
        <p className="text-slate-500 text-sm">See how your current semester impacts your overall standing.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-md text-white col-span-2 md:col-span-1">
            <div className="text-sm font-medium text-slate-500 mb-1">New Cumulative GPA</div>
            <div className="text-4xl font-bold text-[#792082]">{cumulativeGPA}</div>
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

    <div className="p-6 pb-1 pt-3 sm:pt-3 sm:pb-0 sm:p-8 md:col-span-3 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Academic History</h3>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs lg:text-sm font-bold text-slate-700 mb-1 block leading-tight" title="Your total earned credits BEFORE this current semester began.">
                Total Earned Credits
                <span className="block text-[10px] text-slate-400 font-medium mt-0.5 normal-case">(Prior to this term)</span>
              </label>
              <input 
                type="number" min="0" step="0.5" placeholder="e.g. 60" 
                value={pastData.credits} 
                onChange={(e) => setPastData({...pastData, credits: e.target.value})}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] outline-none" 
              />
            </div>
            <div>
              <label className="text-xs lg:text-sm font-bold text-slate-700 mb-1 block leading-tight" title="Your official Cumulative GPA from your transcript.">
                Current CGPA
                <span className="block text-[10px] text-slate-400 font-medium mt-0.5 normal-case">(From transcript)</span>
              </label>
              <input 
                type="number" min="0" max="4.33" step="0.01" placeholder="e.g. 3.25" 
                value={pastData.gpa} 
                onChange={(e) => setPastData({...pastData, gpa: e.target.value})}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#792082] outline-none" 
              />
            </div>
          </div>
       </div>

        <div className="p-6 sm:p-8 md:col-span-9 bg-slate-50/30">
          <div className="mb-4 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800">Current Semester Courses</h3>
            <span className="text-xs text-slate-500 leading-tight mt-1">Add the courses you are currently taking or expect to take to see how they will affect your overall CGPA.</span>
          </div>
          
          <div className="space-y-4">
            {courses.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
                
                {/* Delete Button */}
                <button onClick={() => removeCourse(c.id)} disabled={courses.length === 1} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-0" title="Remove course">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="grid grid-cols-12 gap-3 items-end pr-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label className="text-xs text-slate-700 font-bold mb-1 block">
                      Course Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input type="text" placeholder="e.g. MTH 140" value={c.name} onChange={(e) => updateCourse(c.id, 'name', e.target.value)} onFocus={(e) => e.target.select()} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#792082] focus:bg-white" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="text-xs text-slate-700 font-bold mb-1 block">
                      Credits <span className="text-slate-400 font-normal">(Billing units)</span>
                    </label>
                    <input type="number" min="0" step="0.5" placeholder="Cr" value={c.credits} onChange={(e) => updateCourse(c.id, 'credits', e.target.value)} onFocus={(e) => e.target.select()} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#792082] focus:bg-white" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="text-xs text-slate-700 font-bold mb-1 block">Target Grade</label>
                    <div className="relative">
                      <select 
                        value={c.grade} 
                        onChange={(e) => updateCourse(c.id, 'grade', e.target.value)} 
                        className="w-full pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none appearance-none focus:ring-2 focus:ring-[#792082] focus:bg-white"
                      >
                        {Object.keys(gradeScale).map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      
                      {/* Custom Down Arrow Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Repeat Course Toggle */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4">
                  <label className="flex items-start sm:items-center gap-2 cursor-pointer" title="Check this if you are retaking a course to replace a previous attempt.">
                    <input 
                      type="checkbox" 
                      checked={c.isRepeat} 
                      onChange={(e) => updateCourse(c.id, 'isRepeat', e.target.checked)}
                      // ADDED: shrink-0 so the checkbox never gets squished, and a tiny top margin for mobile wrapping
                      className="w-4 h-4 mt-0.5 sm:mt-0 text-[#792082] rounded border-slate-300 focus:ring-[#792082] shrink-0"
                    />
                    <span className="text-xs font-medium text-slate-600 leading-tight">
                      This is a repeated course 
                      {/* Fixed the extra space in the class name and added inline-block so it wraps cleanly together */}
                      <span className="inline-block text-slate-400 font-normal ml-1">(Replaces previous attempt)</span>
                    </span>
                  </label>
                  
                  {c.isRepeat && (
                    <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200" title="Enter the grade you received the FIRST time you took this course so we can remove its penalty.">
                      <span className="text-xs text-slate-700 font-bold">Old Grade <span className="text-slate-400 font-normal">(To be removed):</span></span>
                      <select 
                        value={c.oldGrade} 
                        onChange={(e) => updateCourse(c.id, 'oldGrade', e.target.value)} 
                        className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs outline-none text-amber-800 focus:bg-white"
                      >
                        {Object.keys(gradeScale).map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 flex justify-between items-center">
            <button onClick={addCourse} className="text-sm px-4 py-2 bg-white border border-slate-200 text-[#792082] font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              + Add Another Course
            </button>
            <button 
              onClick={() => {
                setPastData({ credits: '', gpa: '' });
                setCourses([{ id: crypto.randomUUID(), name: '', credits: '1', grade: 'A+ (90-100)', isRepeat: false, oldGrade: 'F (0-49)' }]);
              }} 
              className="text-sm text-slate-400 hover:text-slate-600 font-medium"
            >
              Reset
            </button>
          </div>
        </div>
    </div>
  );
}