import React from 'react';
import { COMPANY_INFO } from '../constants/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Logo Công Định" 
                className="h-9 w-auto object-contain"
              />
              <span className="text-xl font-black text-white">{COMPANY_INFO.brandName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">{COMPANY_INFO.displayName}</p>
            <p className="text-xs text-slate-500">{COMPANY_INFO.slogan}</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Điều hướng</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition">Trang chủ</a></li>
              <li><a href="#about" className="hover:text-white transition">Giới thiệu</a></li>
              <li><a href="#products" className="hover:text-white transition">Sản phẩm</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Hình ảnh cửa hàng</a></li>
              <li><a href="#contact" className="hover:text-white transition">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">Thông tin cửa hàng</h4>
            <p className="text-xs mb-1">Cơ sở 1: {COMPANY_INFO.address1}</p>
            <p className="text-xs mb-3">Cơ sở 2: {COMPANY_INFO.address2}</p>
            <p className="text-xs font-semibold text-red-400">Hotline: {COMPANY_INFO.phones.join(' - ')}</p>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.displayName}. Bản quyền thuộc về CÔNG ĐỊNH.</p>
        </div>
      </div>
    </footer>
  );
};