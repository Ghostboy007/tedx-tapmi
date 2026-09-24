import React, { useContext, useState } from 'react';
import { CMSContext } from '../context/CMSContext';
import jsPDF from 'jspdf';

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

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    const email = formData.email.trim().toLowerCase();
    const rollNo = formData.rollNo.trim().toUpperCase();
    const phone = formData.phone.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!email) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@learner\.manipal\.edu$/.test(email)) {
      errs.email = "Use your college email ending in @learner.manipal.edu.";
    }

    if (!rollNo) {
      errs.rollNo = "Roll number is required.";
    } else if (rollNo.length !== 6 || !/^\d{2}[A-Z]\d{3}$/.test(rollNo)) {
      errs.rollNo = "Roll number must be exactly 6 characters, for example 26A129.";
    }

    if (!phone) {
      errs.phone = "Phone number is required.";
    } else if (phone.length > 13 || !/^[+\d][\d\s()-]*$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 13) {
      errs.phone = "Enter a valid phone number with 10 to 13 digits (maximum 13 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const downloadRegistrationPDF = (registration) => {
    const doc = new jsPDF();

    // Page border
    doc.setDrawColor(230, 43, 30);
    doc.setLineWidth(1.5);
    doc.rect(15, 15, 180, 267);

    // Header
    doc.setFillColor(230, 43, 30);
    doc.rect(15, 15, 180, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('TEDxTAPMI', 105, 31, { align: 'center' });

    doc.setFontSize(11);
    doc.text('2026 Student Registration Pass', 105, 42, {
      align: 'center'
    });

    // Confirmation
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(18);
    doc.text('Registration Confirmed', 105, 70, {
      align: 'center'
    });

    // Registration number
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(35, 82, 140, 25, 4, 4, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(90, 90, 90);
    doc.text('REGISTRATION NUMBER', 105, 92, {
      align: 'center'
    });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(230, 43, 30);
    doc.text(String(registration.id), 105, 101, {
      align: 'center'
    });

    // Student details
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    doc.text('STUDENT DETAILS', 35, 125);

    doc.setDrawColor(220, 220, 220);
    doc.line(35, 129, 175, 129);

    // Name
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('FULL NAME', 35, 142);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(String(registration.fullName), 35, 151);

    // Roll number
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('ROLL NUMBER', 35, 169);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(String(registration.rollNo), 35, 178);

    // Email
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('EMAIL', 35, 196);

    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(String(registration.email), 35, 205);

    // Venue information
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(35, 216, 140, 42, 4, 4, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('DATE', 45, 226);

    doc.setFont('helvetica', 'normal');
    doc.text('11th October', 75, 226);

    doc.setFont('helvetica', 'bold');
    doc.text('TIME', 45, 237);

    doc.setFont('helvetica', 'normal');
    doc.text('2 PM-5 PM', 75, 237);

    doc.setFont('helvetica', 'bold');
    doc.text('VENUE', 45, 248);

    doc.setFont('helvetica', 'normal');
    doc.text('Seminar Hall, TAPMI', 75, 248);

    // Verification instructions
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(230, 43, 30);
    doc.text('ENTRY VERIFICATION', 35, 271);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 70, 70);
    doc.text('Please carry your valid college ID for entry verification.', 35, 279);

    // Download
    const safeName = String(registration.fullName)
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

    doc.save(`TEDxTAPMI_Registration_${safeName}.pdf`);
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
        rollNo: formData.rollNo,
        phone: formData.phone,
        cohort: formData.cohort
      });

      setTicket(reg);

      // Automatically download the PDF after successful registration
      downloadRegistrationPDF(reg);

    } catch (error) {
      setErrors({
        form: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      rollNo: '',
      phone: '',
      cohort: 'TAPMI MBA Student'
    });

    setTicket(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-page-enter">

      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">

        <span className="inline-block px-4 py-1.5 bg-[#E62B1E]/15 border border-[#E62B1E]/40 text-[#E62B1E] font-black text-xs uppercase tracking-widest rounded-full">
          🎟️ {totalRegistrations} Student Registrations
        </span>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">
          Register For TEDxTAPMI
        </h1>

        <p className="text-xs sm:text-sm text-gray-400">
          Official student registration portal for TEDxTAPMI 2026.
          Complete your registration and download your registration pass.
        </p>

      </div>

      {/* Registration Card */}
      <div className="bg-[#0E0E14] border border-[#262638] rounded-3xl p-6 sm:p-12 shadow-2xl relative tedx-neon-border">

        {!ticket ? (

          <form onSubmit={handleSubmit} className="space-y-6">

            {errors.form && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                {errors.form}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name *
                </label>

                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value
                    })
                  }
                  placeholder="e.g. Aarav Mehta"
                  className={`w-full px-4 py-3 bg-[#151520] border ${
                    errors.fullName
                      ? 'border-red-500'
                      : 'border-[#2B2B3E]'
                  } rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />

                {errors.fullName && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Email Address *
                </label>

                <input
                  type="email"
                  maxLength={80}
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  placeholder="aarav@learner.manipal.edu"
                  className={`w-full px-4 py-3 bg-[#151520] border ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-[#2B2B3E]'
                  } rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />

                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  TAPMI Roll Number *
                </label>

                <input
                  type="text"
                  maxLength={6}
                  minLength={6}
                  pattern="\\d{2}[A-Za-z]\\d{3}"
                  required
                  autoCapitalize="characters"
                  value={formData.rollNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rollNo: e.target.value.toUpperCase()
                    })
                  }
                  placeholder="e.g. 26A129"
                  className={`w-full px-4 py-3 bg-[#151520] border ${
                    errors.rollNo
                      ? 'border-red-500'
                      : 'border-[#2B2B3E]'
                  } rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />

                {errors.rollNo && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">
                    {errors.rollNo}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  maxLength={13}
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    })
                  }
                  placeholder="e.g. +919876543210"
                  className={`w-full px-4 py-3 bg-[#151520] border ${
                    errors.phone
                      ? 'border-red-500'
                      : 'border-[#2B2B3E]'
                  } rounded-xl focus:outline-none focus:border-[#E62B1E] text-sm text-white placeholder-gray-500`}
                />

                {errors.phone && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">
                    {errors.phone}
                  </p>
                )}
              </div>

            </div>

            {/* Registration information */}
            <div className="rounded-xl border border-[#2B2B3E] bg-[#151520] p-4">
              <p className="text-xs text-gray-400">
                Your registration will be verified at the venue using your
                <span className="text-white font-bold"> TAPMI Roll Number </span>
                and college ID.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-[#E62B1E] hover:bg-[#C42115] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#E62B1E]/40 flex items-center justify-center space-x-2 cursor-pointer ${
                isSubmitting
                  ? 'opacity-75 cursor-not-allowed'
                  : ''
              }`}
            >

              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Registration...</span>
                </>
              ) : (
                <span>
                  Confirm Registration & Download Pass →
                </span>
              )}

            </button>

          </form>

        ) : (

          /* Success Screen */
          <div className="space-y-6 text-center py-4">

            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold rounded-full">
              ✓ Registration Confirmed
            </span>

            <div className="max-w-md mx-auto bg-[#141420] border-2 border-[#E62B1E] rounded-2xl overflow-hidden shadow-2xl text-left">

              {/* Header */}
              <div className="bg-[#E62B1E] p-5 text-white">

                <div className="flex justify-between items-center">

                  <div>
                    <span className="text-xl font-black font-heading">
                      TEDx
                    </span>

                    <span className="text-sm font-bold ml-1">
                      TAPMI
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold bg-black/40 px-2.5 py-1 rounded">
                    {ticket.id}
                  </span>

                </div>

              </div>

              {/* Details */}
              <div className="p-6 space-y-5">

                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Registration Number
                  </p>

                  <h3 className="text-xl font-black text-[#E62B1E] font-heading">
                    {ticket.id}
                  </h3>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Student Name
                  </p>

                  <h3 className="text-2xl font-black text-white font-heading">
                    {ticket.fullName}
                  </h3>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Roll Number
                  </p>

                  <h3 className="text-lg font-bold text-white">
                    {ticket.rollNo}
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#262638]">

                  <p className="text-xs text-gray-400">
                    Please carry your valid TAPMI college ID to the venue.
                    Your roll number will be checked against the registration
                    database before entry.
                  </p>

                </div>

              </div>

            </div>

            <div className="flex justify-center space-x-4 pt-2">

              <button
                onClick={resetForm}
                className="px-6 py-3 bg-[#1B1B26] hover:bg-[#252535] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-700 transition-all cursor-pointer"
              >
                Register Another Student
              </button>

              <button
                onClick={() => downloadRegistrationPDF(ticket)}
                className="px-6 py-3 bg-[#E62B1E] hover:bg-[#C42115] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#E62B1E]/40 cursor-pointer"
              >
                📥 Download PDF
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
