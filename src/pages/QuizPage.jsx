import React, { useState } from 'react';

const NEW_QUIZ_QUESTIONS = [
  {
    question: "What best describes your current professional or academic focus?",
    options: [
      "Building a business, startup, or working in tech.",
      "Working in NGOs, public service, or environmental fields.",
      "Teaching, coaching, HR, or studying human behavior.",
      "Freelancing, creating art, design, or media."
    ]
  },
  {
    question: "What is your primary area of study or expertise?",
    options: [
      "Engineering, Computer Science, or Business Finance.",
      "Environmental Science, Sociology, or Law.",
      "Psychology, Education, or Communications.",
      "Humanities, Fine Arts, or Literature."
    ]
  },
  {
    question: "When faced with a massive global problem, what is your first instinct?",
    options: [
      "Build a technological solution or optimize the current system.",
      "Organize a grassroots movement or change public policies.",
      "Educate individuals so they can make better daily choices.",
      "Document the issue and share the human stories behind it."
    ]
  },
  {
    question: "How do you usually convince others to support your ideas?",
    options: [
      "With hard data, market trends, and logical frameworks.",
      "With moral urgency and long-term impact analysis.",
      "By relating to their personal struggles and offering encouragement.",
      "Through compelling narratives, humor, and emotional connection."
    ]
  },
  {
    question: "If you were to give a TEDx talk tomorrow, what would be your opening hook?",
    options: [
      "\"Imagine a world where AI does 90% of our manual labor.\"",
      "\"We have exactly ten years to reverse this trend before it's too late.\"",
      "\"When I was 18, I failed completely. Here is why that was my greatest gift.\"",
      "\"Let me tell you a story about a photograph that changed how I see color.\""
    ]
  },
  {
    question: "What is your ultimate goal when stepping off the stage?",
    options: [
      "The audience invests in a new idea or technology.",
      "The audience changes their daily habits or signs a petition.",
      "The audience feels inspired to pursue their personal goals.",
      "The audience sees the world from a completely new, creative perspective."
    ]
  },
  {
    question: "Choose the word that best describes your core drive:",
    options: [
      "Disruption",
      "Equity",
      "Growth",
      "Expression"
    ]
  }
];

const RESULT_VIDEOS = {
  Innovator: [
    { title: "The Art of Innovation", url: "https://www.youtube.com/embed/Mtjatz9r-Vc" },
    { title: "Why Innovation is All About People", url: "https://www.youtube.com/embed/Q7chxarBJ98" },
    { title: "How Quantum Technologies May Impact Your Life", url: "https://www.youtube.com/embed/_dYxqmQDMls" }
  ],
  Changemaker: [
    { title: "Are We the Last Generation?", url: "https://www.youtube.com/embed/Kl3VVrggKz4" },
    { title: "Defining Sustainability", url: "https://www.youtube.com/embed/B-dCmbViDEQ" },
    { title: "The 5 Principles of Social Impact", url: "https://www.youtube.com/embed/vsQJ2Y_F0ZY" }
  ],
  Mentor: [
    { title: "After Watching This, Your Brain Will Not Be the Same", url: "https://www.youtube.com/embed/LNHBMFCzznE" },
    { title: "How to Make Stress Your Friend", url: "https://www.youtube.com/embed/RcGyVTAoXEU" },
    { title: "The Secrets and Science of Mental Toughness", url: "https://www.youtube.com/embed/rNxC16mlO60" }
  ],
  Storyteller: [
    { title: "The Magical Science of Storytelling", url: "https://www.youtube.com/embed/Nj-hdQMa3uA" },
    { title: "The Clues to a Great Story", url: "https://www.youtube.com/embed/KxDwieKpawg" },
    { title: "The 3 Ingredients of Powerful Storytelling", url: "https://www.youtube.com/embed/Bt3AACk6dbo" }
  ]
};

export function QuizPage({ setCurrentPage }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // 1. STATE VARIABLES & LOGIC
  const [innovatorScore, setInnovatorScore] = useState(0);
  const [changemakerScore, setChangemakerScore] = useState(0);
  const [mentorScore, setMentorScore] = useState(0);
  const [storytellerScore, setStorytellerScore] = useState(0);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelectOption = (optionIndex) => {
    let newInnovator = innovatorScore;
    let newChangemaker = changemakerScore;
    let newMentor = mentorScore;
    let newStoryteller = storytellerScore;

    // Option A
    if (optionIndex === 0) newInnovator++;
    // Option B
    if (optionIndex === 1) newChangemaker++;
    // Option C
    if (optionIndex === 2) newMentor++;
    // Option D
    if (optionIndex === 3) newStoryteller++;

    setInnovatorScore(newInnovator);
    setChangemakerScore(newChangemaker);
    setMentorScore(newMentor);
    setStorytellerScore(newStoryteller);

    if (currentStep + 1 < NEW_QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newInnovator, newChangemaker, newMentor, newStoryteller, optionIndex);
    }
  };

  const calculateResult = (iScore, cScore, mScore, sScore, lastAnswerIndex) => {
    // 3. CALCULATION & TIE-BREAKER
    const categories = ['Innovator', 'Changemaker', 'Mentor', 'Storyteller'];
    const scores = [iScore, cScore, mScore, sScore];
    
    const maxScore = Math.max(...scores);
    
    const winners = [];
    scores.forEach((score, index) => {
      if (score === maxScore) winners.push(index);
    });

    let finalWinnerIndex = winners[0];

    // Tie-breaker: use Q7 answer
    if (winners.length > 1) {
      if (winners.includes(lastAnswerIndex)) {
        finalWinnerIndex = lastAnswerIndex;
      }
    }

    setResult(categories[finalWinnerIndex]);
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setInnovatorScore(0);
    setChangemakerScore(0);
    setMentorScore(0);
    setStorytellerScore(0);
    setQuizCompleted(false);
    setResult(null);
  };

  // 4. RESULTS UI
  const getResultDetails = () => {
    switch (result) {
      case 'Innovator':
        return {
          title: "The Tech-Savvy Innovator",
          description: "You leverage technology and business scaling to build the future."
        };
      case 'Changemaker':
        return {
          title: "The Impact-Driven Changemaker",
          description: "You focus on sustainability, equity, and systemic shifts."
        };
      case 'Mentor':
        return {
          title: "The Empowering Mentor",
          description: "You excel at student motivation, psychology, and unlocking human potential."
        };
      case 'Storyteller':
        return {
          title: "The Creative Storyteller",
          description: "You captivate audiences through arts, culture, and unconventional ideas."
        };
      default:
        return { title: "", description: "" };
    }
  };

  const resultDetails = result ? getResultDetails() : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-page-enter">
      
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
          Interactive Assessment
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">What Kind of TEDx Speaker Could You Be?</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Take this 7-question assessment to discover your core TEDx speaker archetype and see what kind of idea worth spreading you represent.
        </p>
      </div>

      <div className="bg-[#0E0E14] border border-[#262638] rounded-3xl p-6 sm:p-12 shadow-2xl relative tedx-neon-border">
        {!quizCompleted ? (
          <div className="space-y-8 animate-page-enter" key={currentStep}>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>Question {currentStep + 1} of {NEW_QUIZ_QUESTIONS.length}</span>
                <span className="text-[#E62B1E] font-mono">{Math.round(((currentStep + 1) / NEW_QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#171722] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E62B1E] transition-all duration-300 shadow-md shadow-[#E62B1E]/50"
                  style={{ width: `${((currentStep + 1) / NEW_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug">
              {NEW_QUIZ_QUESTIONS[currentStep].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {NEW_QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="p-5 bg-[#151520] hover:bg-[#1E1E2C] border border-[#272738] hover:border-[#E62B1E] rounded-2xl text-left font-medium text-xs sm:text-sm text-gray-200 hover:text-white transition-all flex items-center space-x-4 group cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-bold text-xs flex items-center justify-center group-hover:bg-[#E62B1E] group-hover:text-white transition-colors shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          resultDetails && (
            <div className="text-center space-y-8 py-8 animate-page-enter">
              <span className="inline-block px-4 py-1.5 bg-[#E62B1E]/20 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
                🏆 Your Speaker Archetype
              </span>

              <div className="max-w-xl mx-auto bg-[#14141E] border-2 border-[#E62B1E] rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl text-center">
                <h3 className="text-3xl sm:text-4xl font-black text-[#E62B1E] font-heading leading-tight">
                  You are {resultDetails.title}!
                </h3>
                
                <div className="w-16 h-1 bg-[#272738] mx-auto rounded-full"></div>
                
                <p className="text-base sm:text-lg font-semibold text-gray-200 leading-relaxed">
                  {resultDetails.description}
                </p>
              </div>

              {/* Watch Speakers Like You in Action */}
              <div className="pt-8 space-y-8 max-w-5xl mx-auto">
                <h4 className="text-xl sm:text-2xl font-black text-white font-heading text-center">
                  Watch Speakers Like You in Action
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {RESULT_VIDEOS[result]?.map((video, idx) => (
                    <div key={idx} className="bg-[#151520] rounded-xl overflow-hidden shadow-lg border border-[#272738] group hover:border-[#E62B1E] transition-all">
                      <div className="relative pt-[56.25%] w-full bg-black">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={video.url}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h5 className="text-sm font-bold text-gray-200 line-clamp-2 leading-snug group-hover:text-[#E62B1E] transition-colors">
                          {video.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-[#272738] max-w-2xl mx-auto">
                <button onClick={() => alert('Result copied! Share your speaker archetype on social media.')} className="px-8 py-3 bg-[#E62B1E] hover:bg-[#C42115] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#E62B1E]/40 cursor-pointer">
                  🔗 Share your result
                </button>
                <button onClick={() => setCurrentPage?.('home')} className="px-8 py-3 bg-[#1B1B26] hover:bg-[#252535] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-700 transition-all cursor-pointer">
                  🏠 Return to Home
                </button>
                <button onClick={restartQuiz} className="px-8 py-3 bg-transparent hover:bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer">
                  🔄 Retake
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
