import React from 'react';
import { MessageCircle, Phone, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { useFood } from '../context/FoodContext';

export const Footer: React.FC = () => {
  const { generateWhatsAppOrderUrl, setIsAdminOpen, language } = useFood();

  return (
    <footer className="bg-[#080c14] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-display font-bold text-base flex items-center justify-center">
                AP
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Azhar Chiniot Pakwan
              </span>
            </div>
            <p className="text-amber-400/90 font-medium">
              Al Mashoor Model Town Wala
            </p>
            <p className="font-urdu text-sm text-slate-300">
              المشہور ماڈل ٹاؤن والا - روایتی دیسی پکوان و کیٹرنگ
            </p>
            <p className="text-slate-400 text-xs leading-relaxed pt-1">
              Serving the authentic heritage of Chinioti culinary craft with pure ingredients, desi ghee, and sealed copper deghs for over 30 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#dishes" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Food Menu
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Categories & Dishes
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-amber-400 transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Us (ہمارا تعارف)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Signature Specialties
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Special Chinioti Biryani</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Authentic Mutton Kunna Handi</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Degi Shahi Mutton Qorma</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Desi Ghee Chicken Karahi</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Wedding Daig & Event Catering</span>
              </li>
            </ul>
          </div>

          {/* Contact & Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ordering & Branch
            </h4>
            <div className="space-y-2 text-slate-300 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>N Block, Zahoor Market, Model Town Extension, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:03004936594" className="hover:text-amber-400">
                  03004936594
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-semibold text-emerald-400"
                >
                  WhatsApp: 03004936594
                </a>
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Timings: 11:00 AM – 1:00 AM (Daily)
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[11px] text-slate-400 hover:text-amber-300 underline"
              >
                Owner / Manager Portal
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} Azhar Chiniot Pakwan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Halal & Hygienic Certified</span>
            </span>
            <span>·</span>
            <span>Lahore Food Authority Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
