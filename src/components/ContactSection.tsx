import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Send, Check, Mail } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const ContactSection: React.FC = () => {
  const { generateWhatsAppOrderUrl, language } = useFood();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Open whatsapp with inquiry
    const text = `*New Customer Inquiry - Azhar Chiniot Pakwan*\n\n• Name: ${inquiryName}\n• Phone: ${inquiryPhone}\n• Message: ${inquiryMessage}`;
    window.open(`https://wa.me/923004936594?text=${encodeURIComponent(text)}`, '_blank');
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 bg-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
            Visit Us or Order Delivery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Location
          </h2>
          {(language === 'both' || language === 'ur') && (
            <p className="font-urdu text-xl text-amber-200/90">
              ماڈل ٹاؤن برانچ - رابطہ اور لوکیشن کی تفصیلات
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Info Cards */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main Location Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Azhar Chiniot Pakwan
                  </h3>
                  <p className="text-xs font-semibold text-amber-400 mb-1">
                    Al Mashoor Model Town Wala · المشہور ماڈل ٹاؤن والا
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    N Block, Zahoor Market, Model Town Extension, Lahore, Punjab, Pakistan.
                  </p>
                  <p className="font-urdu text-sm text-amber-300/90 pt-1">
                    این بلاک، ظہور مارکیٹ، ماڈل ٹاؤن ایکسٹینشن، لاہور
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href="https://maps.google.com/?q=N+Block+Zahoor+Market+Model+Town+Extension+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-900/40"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-950" />
                  <span>WhatsApp Order Now</span>
                </a>
              </div>
            </div>

            {/* Timings & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Opening Hours</span>
                </div>
                <p className="text-sm font-bold text-white">
                  11:00 AM – 01:00 AM
                </p>
                <p className="text-xs text-slate-400">
                  Open 7 Days a week (Lunch, Dinner, Midnight Daig Dispatch)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Phone & Hotline</span>
                </div>
                <div className="space-y-0.5">
                  <a
                    href="tel:03004936594"
                    className="block text-base font-bold text-white hover:text-amber-400 transition-colors tracking-wide"
                  >
                    03004936594
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  Call for Daig Bookings & Bulk Catering
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Message / Catering Booking Form */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-amber-500/20 space-y-5 shadow-2xl">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Send an Inquiry or Daig Booking
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Have questions about custom portions or wedding reservations? Send us a quick note.
              </p>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Redirecting to WhatsApp to send your inquiry to our manager...</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Mian Bilal"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Message or Catering Inquiry *
                </label>
                <textarea
                  rows={3}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Inquiring about 3 daigs of Mutton Kunna for family event on Sunday..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
