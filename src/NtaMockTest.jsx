import React from 'react';

const QUESTION_BANK = [
  {
    id: 1,
    paper: "Paper 1",
    subject: "Research Aptitude",
    type: "mcq",
    text: "A researcher commits a Type I error when they:",
    options: [
      "Accept a null hypothesis when it is true",
      "Reject a null hypothesis when it is true",
      "Reject a null hypothesis when it is false",
      "Accept a null hypothesis when it is false"
    ],
    correctAnswer: 1,
    explanation: "A Type I error (false positive) occurs when a researcher rejects a true null hypothesis. Type II error occurs when a researcher fails to reject a false null hypothesis."
  },
  {
    id: 2,
    paper: "Paper 1",
    subject: "Teaching Aptitude",
    type: "mcq",
    text: "Which of the following is a learner-centric teaching method?",
    options: [
      "Lecture method",
      "Demonstration method",
      "Project-based learning",
      "Chalk and talk method"
    ],
    correctAnswer: 2,
    explanation: "Project-based learning focuses on active student engagement with real-world challenges, making it highly learner-centric compared to passive lecture systems."
  },
  {
    id: 3,
    paper: "Paper 2",
    subject: "Management",
    type: "mcq",
    text: "According to Ansoff's Matrix, entering a completely new market with a brand new product profile is categorized as:",
    options: [
      "Market Penetration",
      "Market Development",
      "Product Development",
      "Diversification"
    ],
    correctAnswer: 3,
    explanation: "Ansoff's Growth Matrix defines four strategies. New Product + New Market equals Diversification, which carries the highest operational risk profile."
  },
  {
    id: 4,
    paper: "Paper 2",
    subject: "Management",
    type: "mcq",
    text: "The Minimum Alternate Tax (MAT) is calculated on which profit base?",
    options: [
      "Gross Operating Profit",
      "Book Profit",
      "Net Taxable Income",
      "Retained Earnings Base"
    ],
    correctAnswer: 1,
    explanation: "Under Section 115JB of the Income Tax Act, MAT is levied as a percentage of the Book Profit computed under standard corporate accounting layouts."
  },
  {
    id: 5,
    paper: "Paper 1",
    subject: "People, Development and Environment",
    type: "mcq",
    text: "Under the Kigali Amendment to the Montreal Protocol, India is required to phase down its consumption of Hydrofluorocarbons (HFCs) by 85% by which year?",
    options: [
      "2030",
      "2040",
      "2045",
      "2047"
    ],
    correctAnswer: 3,
    explanation: "India belongs to Group 2 of developing nations with a baseline period of 2024–2026. It must freeze HFC consumption by 2028 and drop it by 85% by 2047."
  },
  {
    id: 6,
    paper: "Paper 2",
    subject: "Management",
    type: "mcq",
    text: "Concession bargaining occurs when unions agree to give up previous wage gains or benefits in exchange for job security during economic downturns.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 0,
    explanation: "Concession bargaining is common during recessions where unions prioritize job retention and operational safety over high compensation premiums."
  }
];

const totalQuestions = QUESTION_BANK.length;

export default function NtaMockTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [status, setStatus] = React.useState(() => {
    const initialStatus = {};
    for (let i = 1; i <= totalQuestions; i++) {
      initialStatus[i] = "Not Visited";
    }
    initialStatus[1] = "Not Answered";
    return initialStatus;
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const currentQuestion = QUESTION_BANK[currentQuestionIndex];

  const handleOptionSelect = (optionIdx) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQuestion.id]: optionIdx });
  };

  const handleSaveAndNext = () => {
    if (answers[currentQuestion.id] !== undefined) {
      setStatus({ ...status, [currentQuestion.id]: "Answered" });
    } else {
      setStatus({ ...status, [currentQuestion.id]: "Not Answered" });
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextId = QUESTION_BANK[currentQuestionIndex + 1].id;
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (status[nextId] === "Not Visited") {
        setStatus(prev => ({ ...prev, [currentQuestion.id]: answers[currentQuestion.id] !== undefined ? "Answered" : "Not Answered", [nextId]: "Not Answered" }));
      }
    }
  };

  const handleClearResponse = () => {
    if (isSubmitted) return;
    const updatedAnswers = { ...answers };
    delete updatedAnswers[currentQuestion.id];
    setAnswers(updatedAnswers);
    setStatus({ ...status, [currentQuestion.id]: "Not Answered" });
  };

  const handleMarkForReview = () => {
    if (answers[currentQuestion.id] !== undefined) {
      setStatus({ ...status, [currentQuestion.id]: "Answered & Marked for Review" });
    } else {
      setStatus({ ...status, [currentQuestion.id]: "Marked for Review" });
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTION_BANK.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans select-none">
      {/* Top Banner Header Layout */}
      <header className="bg-[#0f4c81] text-white p-3 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-lg font-bold tracking-wide">National Testing Agency (NTA)</h1>
          <p className="text-xs text-blue-200">UGC NET Computer Based Test Engine</p>
        </div>
        <div className="bg-[#1d6fa5] px-3 py-1 rounded text-sm font-semibold">
          Time Left: 03:00:00
        </div>
      </header>

      {/* Main Column Framework Content split block */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Exam Question Panel */}
        <div className="flex-1 p-4 flex flex-col overflow-y-auto bg-white border-r border-gray-200">
          <div className="border-b pb-2 mb-4 flex justify-between items-center">
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold uppercase">
              {currentQuestion.paper} • {currentQuestion.subject}
            </span>
            <span className="text-sm font-medium text-gray-500">
              Question Type: Multiple Choice
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Question No. {currentQuestionIndex + 1}
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {currentQuestion.text}
            </p>
          </div>

          {/* Radio Grid Options list */}
          <div className="space-y-3 mb-6 flex-1">
            {currentQuestion.options.map((option, idx) => {
              const isChecked = answers[currentQuestion.id] === idx;
              return (
                <label 
                  key={idx} 
                  className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                    isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${currentQuestion.id}`}
                    checked={isChecked}
                    onChange={() => handleOptionSelect(idx)}
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    disabled={isSubmitted}
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              );
            })}
          </div>

          {/* Action Control Button Layout strip */}
          <div className="border-t pt-4 flex flex-wrap gap-2 justify-between">
            <div className="flex gap-2">
              <button 
                onClick={handleMarkForReview}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm transition"
                disabled={isSubmitted}
              >
                Mark for Review & Next
              </button>
              <button 
                onClick={handleClearResponse}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-xs font-semibold shadow-sm transition"
                disabled={isSubmitted}
              >
                Clear Response
              </button>
            </div>
            <button 
              onClick={handleSaveAndNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded text-xs font-bold shadow-sm transition"
              disabled={isSubmitted}
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Side Status Panel Palette Column */}
        <div className="w-full md:w-80 bg-gray-50 p-4 flex flex-col border-t md:border-t-0 border-gray-200">
          {/* Mock Candidate Avatar Layout Block */}
          <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border mb-4 shadow-sm">
            <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
              NET
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Candidate Name</h4>
              <p className="text-xs text-gray-500">Subject: Management</p>
            </div>
          </div>

          {/* Status Indicators Reference Index Grid */}
          <div className="bg-white p-3 rounded-lg border mb-4 shadow-sm text-xs grid grid-cols-2 gap-2">
            <div className="flex items-center"><span className="w-4 h-4 bg-emerald-600 text-white rounded-sm text-[10px] flex items-center justify-center mr-2">0</span> Answered</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-rose-600 text-white rounded-sm text-[10px] flex items-center justify-center mr-2">0</span> Not Answered</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-gray-200 border rounded-sm text-[10px] flex items-center justify-center mr-2">0</span> Not Visited</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-indigo-600 text-white rounded-sm text-[10px] flex items-center justify-center mr-2">0</span> Marked for Review</div>
          </div>

          {/* Dynamic Numeric Question Grid Container */}
          <div className="flex-1 bg-white p-3 rounded-lg border shadow-sm mb-4">
            <h5 className="text-xs font-bold text-gray-700 mb-2 border-b pb-1 uppercase tracking-wide">Choose a Question:</h5>
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
              {QUESTION_BANK.map((q, idx) => {
                const currentStatus = status[q.id];
                let bgClass = "bg-gray-200 text-gray-700";
                if (currentStatus === "Answered") bgClass = "bg-emerald-600 text-white";
                if (currentStatus === "Not Answered") bgClass = "bg-rose-600 text-white";
                if (currentStatus === "Marked for Review") bgClass = "bg-indigo-600 text-white";
                if (currentStatus === "Answered & Marked for Review") bgClass = "bg-purple-600 text-white";
                
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      if (!isSubmitted) {
                        setCurrentQuestionIndex(idx);
                        if (status[q.id] === "Not Visited") {
                          setStatus({ ...status, [q.id]: "Not Answered" });
                        }
                      }
                    }}
                    className={`h-9 rounded font-semibold text-xs border transition shadow-sm ${bgClass} ${
                      currentQuestionIndex === idx ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Finish Submission Module */}
          <div className="bg-white p-3 rounded-lg border shadow-sm mt-auto">
            {isSubmitted ? (
              <div className="text-center p-1">
                <p className="text-sm font-bold text-blue-900">Test Submitted!</p>
                <p className="text-lg font-black text-emerald-600 mt-1">Score: {calculateScore()} / {totalQuestions}</p>
                <button 
                  onClick={() => {
                    setAnswers({});
                    setIsSubmitted(false);
                    setCurrentQuestionIndex(0);
                    const freshStatus = {};
                    for(let i=1; i<=totalQuestions; i++) freshStatus[i] = "Not Visited";
                    freshStatus[1] = "Not Answered";
                    setStatus(freshStatus);
                  }}
                  className="w-full mt-2 bg-gray-800 hover:bg-gray-900 text-white text-xs py-1.5 rounded font-bold transition"
                >
                  Restart Exam
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to submit your final UGC NET exam paper?")) {
                    setIsSubmitted(true);
                  }
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-xs py-2 rounded font-bold uppercase tracking-wider shadow transition"
              >
                Submit Test
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
                      }
