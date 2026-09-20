import React from 'react';
import { COMPANY_INFO } from '../constants/company';
import { Phone, MapPin, ExternalLink, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            LIÊN HỆ VỚI CÔNG ĐỊNH
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Bạn đang cần tìm ống nước nhựa hoặc vật tư ngành nước? Hãy liên hệ Công Định để được hỗ trợ và tư vấn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Cột danh sách số điện thoại và địa chỉ */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
            
            {/* Số điện thoại */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-red-700" />
                <span>Điện thoại liên hệ</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COMPANY_INFO.phones.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-700 hover:text-white text-red-800 font-bold py-3 px-3 rounded-xl transition text-sm text-center"
                  >
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Cơ sở 1 & 2 */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-700" />
                <span>Địa chỉ cơ sở</span>
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider block mb-1">Cơ sở 1</span>
                <p className="text-sm font-medium text-slate-800">{COMPANY_INFO.address1}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider block mb-1">Cơ sở 2</span>
                <p className="text-sm font-medium text-slate-800">{COMPANY_INFO.address2}</p>
              </div>
            </div>

            {/* Nút bản đồ Google Maps */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4 text-red-400" />
                <span>Xem Chỉ Đường</span>
              </a>
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            </div>

          </div>

          {/* Cột nhúng iframe Google Maps */}
          <div className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm relative">
            <iframe
              title="Vị trí cửa hàng Công Định trên Google Maps"
              src="https://maps.google.com/maps?q=Ống+nước+CÔNG+ĐỊNH,+21+Quang+Trung,+Ea+Kar,+Đắk+Lắk&hl=vi&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};