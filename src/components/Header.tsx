import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../constants/company';

interface HeaderProps {
  onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Trang chủ', href: '#hero' },
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Sản phẩm', href: '#products' },
    { name: 'Hình ảnh cửa hàng', href: '#gallery' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand CD */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="Logo Cửa hàng Công Định" 
              className="h-11 sm:h-12 w-auto object-contain"
            />
            <div>
              <span className="text-2xl font-black tracking-tight text-red-700 block leading-none">
                {COMPANY_INFO.brandName}
              </span>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mt-1">
                Ống Nước Nhựa & Vật Tư
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-700 hover:text-red-700 transition"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onAdminClick}
              className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition"
            >
              Quản trị
            </button>
          </nav>

          {/* Call CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${COMPANY_INFO.phones[1].replace(/\s/g, '')}`}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-lg shadow-md transition transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>LIÊN HỆ NGAY</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-red-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-md"
            >
              {item.name}
            </a>
          ))}
          <a
            href={`tel:${COMPANY_INFO.phones[1].replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 bg-red-700 text-white font-bold w-full py-3 rounded-lg shadow"
          >
            <Phone className="w-5 h-5" />
            <span>LIÊN HỆ NGAY</span>
          </a>
          <button
            onClick={() => { setIsOpen(false); onAdminClick(); }}
            className="block w-full text-center text-xs text-gray-400 pt-2"
          >
            Dành cho Quản trị viên
          </button>
        </div>
      )}
    </header>
  );
};