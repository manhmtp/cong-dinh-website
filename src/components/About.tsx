import React from 'react';
import { COMPANY_INFO } from '../constants/company';
import { MapPin } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Cột hình ảnh thật */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/warehouse.jpg"
                alt="Kho hàng ống nhựa Công Định"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-700 text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Địa điểm cửa hàng</p>
              <p className="text-sm font-bold mt-1">Ea Kar, Đắk Lắk</p>
            </div>
          </div>

          {/* Cột thông tin */}
          <div>
            <div className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-md mb-3">
              GIỚI THIỆU
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
              VỀ CÔNG ĐỊNH
            </h2>

            <div className="prose prose-slate text-gray-700 space-y-4 mb-8 leading-relaxed">
              {COMPANY_INFO.aboutText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Cơ sở 1: {COMPANY_INFO.address1}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Cơ sở 2: {COMPANY_INFO.address2}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};