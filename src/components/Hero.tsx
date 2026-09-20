import React from 'react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../constants/company';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-28">
      {/* Background Image với hiệu ứng mờ */}
      <div className="absolute inset-0 z-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url('/images/signboard.jpg')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-900/60 border border-red-700/50 text-red-200 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>{COMPANY_INFO.displayName}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            {COMPANY_INFO.brandName} <br />
            <span className="text-red-500">ỐNG NƯỚC NHỰA & VẬT TƯ NGÀNH NƯỚC</span>
          </h1>

          <p className="text-xl font-medium text-amber-400 italic mb-6">
            "{COMPANY_INFO.slogan}"
          </p>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            {COMPANY_INFO.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition"
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={`tel:${COMPANY_INFO.phones[1].replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl border border-slate-700 shadow-md transition"
            >
              <Phone className="w-5 h-5 text-red-400" />
              <span>Liên hệ ngay</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};