import React, { useContext, useState } from 'react';
import { CMSContext } from '../context/CMSContext';
import jsPDF from 'jspdf';

export function RegisterPage() {
  const { registrationCount, addRegistration, cmsData } = useContext(CMSContext);
  const hero = cmsData.hero || {};
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
    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 12;
    const red = [230, 43, 30];
    const ink = [10, 10, 14];
    const slate = [148, 151, 160];
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    doc.setFillColor(...ink);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(8, 8, 12);
    doc.rect(0, 0, 142, 38, 'F');
    doc.setFillColor(8, 8, 12);
    doc.rect(0, 52, pageWidth, 26, 'F');
    doc.setFillColor(...red);
    doc.rect(0, 76, pageWidth, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);
    doc.text('TEDx', margin, 22);
    doc.setTextColor(...red);
    doc.text('TAPMI', margin + 32, 22);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('OFFICIAL ATTENDEE PASS', margin, 30);
    doc.setFontSize(10);
    doc.setTextColor(210, 212, 218);
    doc.text('2026', pageWidth - margin, 19, { align: 'right' });
    doc.setFontSize(7);
    doc.setTextColor(...red);
    doc.text('INDEPENDENTLY ORGANIZED TED EVENT', pageWidth - margin, 27, { align: 'right' });

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(hero.title || '', margin, 62);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(220, 222, 228);
    doc.text('Ideas worth spreading at TAPMI Manipal', margin, 69);

    doc.setDrawColor(55, 57, 65);
    doc.setLineWidth(0.25);
    for (let x = 0; x <= pageWidth; x += 12) doc.line(x, 78, x, pageHeight);
    for (let y = 84; y <= pageHeight; y += 12) doc.line(0, y, pageWidth, y);

    doc.setFillColor(18, 18, 24);
    doc.roundedRect(margin, 86, 174, 87, 3, 3, 'F');
    doc.setDrawColor(65, 66, 76);
    doc.roundedRect(margin, 86, 174, 87, 3, 3, 'S');
    doc.setFillColor(22, 22, 29);
    doc.roundedRect(194, 86, 91, 87, 3, 3, 'F');
    doc.setDrawColor(...red);
    doc.roundedRect(194, 86, 91, 87, 3, 3, 'S');

    doc.setTextColor(...red);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('YOUR PASS IS CONFIRMED', 20, 97);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('REGISTRATION', 20, 110);
    doc.setTextColor(...red);
    doc.setFontSize(17);
    doc.text(String(registration.id), 20, 121);
    doc.setDrawColor(...red);
    doc.setLineWidth(0.8);
    doc.line(20, 127, 179, 127);

    const drawField = (label, value, x, y, width, size = 10) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...slate);
      doc.text(label, x, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      doc.setTextColor(255, 255, 255);
      const lines = doc.splitTextToSize(String(value || 'N/A'), width);
      doc.text(lines.slice(0, 2), x, y + 6, { lineHeightFactor: 1.05 });
    };

    drawField('ATTENDEE', registration.fullName, 20, 140, 72, 11);
    drawField('ROLL NUMBER', registration.rollNo, 104, 140, 62, 11);
    drawField('EMAIL', registration.email, 20, 158, 145, 8);

    doc.setTextColor(...red);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('EVENT DETAILS', 202, 98);
    doc.setDrawColor(75, 76, 86);
    doc.setLineWidth(0.25);
    doc.line(202, 102, 277, 102);
    drawField('DATE', hero.date, 202, 113, 74, 10);
    drawField('TIME', hero.time, 202, 130, 74, 10);
    drawField('VENUE', hero.location, 202, 147, 74, 9);

    doc.setFillColor(230, 43, 30);
    doc.rect(12, 181, 273, 17, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('ENTRY VERIFICATION', 20, 188);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Please carry your valid college ID for entry verification.', 20, 193);
    doc.setTextColor(100, 101, 110);
    doc.setFontSize(6);
    doc.text('TEDxTAPMI  |  OFFICIAL ATTENDEE PASS  |  2026', pageWidth - margin, 205, { align: 'right' });

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

          <form noValidate onSubmit={handleSubmit} className="space-y-6">

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
