import React, { useContext, useState } from 'react';
import { CMSContext } from '../context/CMSContext';

export function RegisterPage() {
  const { registrationCount, addRegistration } = useContext(CMSContext);
  const totalRegistrations = registrationCount ?? 0;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNo: '',
    phone: '',
    cohort: 'TAPMI MBA Student'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = "Enter a valid 10-digit mobile number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    try {
      const reg = await addRegistration({
        fullName: formData.fullName,
        email: formData.email,
        rollNo: formData.rollNo || 'N/A',
        phone: formData.phone,
        cohort: formData.cohort
      });
      setTicket(reg);
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ fullName: '', email: '', rollNo: '', phone: '', cohort: 'TAPMI MBA Student' });
    setTicket(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-page-enter">
      
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
          🎟️ {totalRegistrations} Delegate Seats Registered
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">Register For TEDxTapmi</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Official delegate registration portal for TEDxTapmi 2026. Secure your pass to access talks, speaker sessions, and executive networking high-tea.
        </p>
      </div>

      <div className="bg-[#0E0E14] border border-[#262638] rounded-3xl p-6 sm:p-12 shadow-2xl relative tedx-neon-border">
        {!ticket ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">{errors.form}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aarav Mehta"
                  className={`w-full px-4 py-3 bg-[#151520] border ${errors.fullName ? 'border-red-500' : 'border-[#2B2B3E]'} rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aarav@tapmi.edu.in"
                  className={`w-full px-4 py-3 bg-[#151520] border ${errors.email ? 'border-red-500' : 'border-[#2B2B3E]'} rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">TAPMI Roll Number (Optional)</label>
                <input
                  type="text"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  placeholder="e.g. 250108899"
                  className="w-full px-4 py-3 bg-[#151520] border border-[#2B2B3E] rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 bg-[#151520] border ${errors.phone ? 'border-red-500' : 'border-[#2B2B3E]'} rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1 font-semibold">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Select Ticket Pass Cohort</label>
              <select
                value={formData.cohort}
                onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                className="w-full px-4 py-3 bg-[#151520] border border-[#2B2B3E] rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white font-medium"
              >
                <option value="TAPMI MBA Student">🎓 TAPMI MBA Student (Student Pass)</option>
                <option value="External Delegate / Student">🎒 External Student Pass</option>
                <option value="Faculty & Alumni">🏛️ Faculty & Alumni Pass</option>
                <option value="VIP Pass">⭐ VIP Reserved Seat & Lounge Access</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-[#E62B1E] hover:bg-[#C42115] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#E62B1E]/40 flex items-center justify-center space-x-2 cursor-pointer ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Official Pass...</span>
                </>
              ) : (
                <span>Confirm Registration & Issue Pass →</span>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold rounded-full">
              ✓ Registration Confirmed
            </span>
            
            <div className="max-w-md mx-auto bg-[#141420] border-2 border-[#E62B1E] rounded-2xl overflow-hidden shadow-2xl text-left">
              <div className="bg-[#E62B1E] p-4 flex justify-between items-center text-white">
                <div>
                  <span className="text-xl font-black font-heading">TEDx</span>
                  <span className="text-sm font-bold ml-1">Tapmi Pass</span>
                </div>
                <span className="text-xs font-mono font-bold bg-black/40 px-2.5 py-1 rounded">{ticket.id}</span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Delegate Name</p>
                  <h3 className="text-2xl font-black text-white font-heading">{ticket.fullName}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold block">Cohort Pass</span>
                    <span className="text-white font-semibold">{ticket.cohort}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block">Roll / ID</span>
                    <span className="text-white font-semibold">{ticket.rollNo}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#262638] flex items-center justify-between">
                  <div className="flex items-start space-x-3 text-sm text-gray-400">
                    <span className="text-[#E62B1E] mt-0.5">📍</span>
                    <p>Seminar Hall, TAPMI</p>
                  </div>
                  <div className="w-14 h-14 bg-white p-1 rounded flex items-center justify-center">
                    <div className="w-full h-full bg-black flex items-center justify-center text-[7px] font-mono text-white text-center font-bold">TEDX{"\n"}QR</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 pt-2">
              <button onClick={resetForm} className="px-6 py-3 bg-[#1B1B26] hover:bg-[#252535] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-700 transition-all cursor-pointer">Register Another Delegate</button>
              <button onClick={() => alert(`Pass ${ticket.id} copied!`)} className="px-6 py-3 bg-[#E62B1E] hover:bg-[#C42115] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#E62B1E]/40 cursor-pointer">📥 Download Pass</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
