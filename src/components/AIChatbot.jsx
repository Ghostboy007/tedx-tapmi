import React, { useState, useRef, useEffect } from 'react';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your TEDx AI Guide. Ask me anything about passes, past speakers, schedule, or campus location for TEDxTapmi.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "🎟️ Ticket Registration",
    "🎙️ Past Speakers",
    "📍 Campus Location",
    "📅 Event Schedule"
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    setTimeout(() => {
      let botResponse = "For any further queries, please connect with the Team, Siddhant (Licensee) - 8390689111";
      const lowerQ = query.toLowerCase();

      if (lowerQ.includes("speaker") || lowerQ.includes("who") || lowerQ.includes("lineup") || lowerQ.includes("past")) {
        botResponse = "Our past TEDxTapmi editions have featured renowned speakers across technology, creative design, cleantech, and behavioral economics! Head over to the Past Speakers page to explore their talks.";
      } else if (lowerQ.includes("register") || lowerQ.includes("ticket") || lowerQ.includes("pass") || lowerQ.includes("fee")) {
        botResponse = "You can register directly on our Register Pass page! We offer options for TAPMI Students, External Delegates, Faculty & Alumni, and VIP Passes.";
      } else if (lowerQ.includes("where") || lowerQ.includes("location") || lowerQ.includes("venue") || lowerQ.includes("campus")) {
        botResponse = "TEDxTapmi takes place at the Seminar Hall, TAPMI Campus, MIT-TAPMI Road, Manipal, Karnataka 576104.";
      } else if (lowerQ.includes("date") || lowerQ.includes("time") || lowerQ.includes("when") || lowerQ.includes("schedule")) {
        botResponse = "The upcoming TEDxTapmi edition is scheduled for Saturday, October 24, 2026. Doors open at 08:30 AM IST.";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#E62B1E] hover:bg-[#C42115] text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center space-x-2 border-2 border-white/20 tedx-glow-md cursor-pointer"
      >
        <span className="text-xl">{isOpen ? '✕' : '🤖'}</span>
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider font-mono">
          {isOpen ? 'Close Guide' : 'TEDx AI Guide'}
        </span>
      </button>

      {/* Floating Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-96 bg-[#0E0E12] border border-[#E62B1E]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] text-white animate-page-enter">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#E62B1E] to-[#990F05] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl p-1 bg-black/30 rounded-full">🤖</span>
              <div>
                <h4 className="text-sm font-extrabold text-white font-heading">TEDx AI Guide</h4>
                <p className="text-[10px] text-red-200 font-semibold">Live Event Navigator</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#08080B]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E62B1E] text-white rounded-br-none font-medium'
                      : 'bg-[#16161E] border border-[#272736] text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] opacity-60 text-right mt-1 font-mono">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-[#0D0D12] border-t border-[#1C1C26] flex overflow-x-auto gap-2 text-[11px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.replace(/^[^\s]+\s/, ''))}
                className="whitespace-nowrap px-3 py-1 bg-[#171722] hover:bg-[#232333] border border-[#2B2B3D] text-gray-300 rounded-full font-medium transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#0E0E12] border-t border-[#1C1C26] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask TEDx AI Guide..."
              className="flex-1 px-3 py-2 bg-[#171720] border border-[#2A2A38] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E62B1E]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#E62B1E] hover:bg-[#C42115] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
