import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  // Danh sách các đường dẫn ảnh hiển thị trong Slideshow
  const images = [
    '/images/pipes.jpg',
    '/images/warehouse.jpg',
    '/images/shelves.jpg',
    '/images/signboard.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh sau mỗi 4 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section id="about" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Khung Slideshow Ảnh */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-slate-200">
            <img
              src={images[currentIndex]}
              alt={`Hình ảnh cửa hàng ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />

            {/* Nút Chuyển Ảnh Trái */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Nút Chuyển Ảnh Phải */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Nút chấm tròn chọn ảnh (Indicators) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-red-600 w-6'
                      : 'bg-white/60 hover:bg-white w-2.5'
                  }`}
                  aria-label={`Chuyển đến ảnh ${index + 1}`}
                />
              ))}
            </div>

            {/* Badge Địa điểm cửa hàng */}
            <div className="absolute bottom-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg z-10 hidden sm:block">
              <p className="text-xs uppercase font-bold tracking-wider">ĐỊA ĐIỂM CỬA HÀNG</p>
              <p className="text-sm font-semibold">Ea Kar, Đắk Lắk</p>
            </div>
          </div>

          {/* Cột Nội Dung Giới Thiệu */}
          <div>
            <span className="text-red-600 font-semibold tracking-wider text-sm uppercase bg-red-100 px-3 py-1 rounded-full">
              Giới thiệu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-6">
              VỀ CÔNG ĐỊNH
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Công Định là cơ sở sản xuất và kinh doanh ống nước nhựa tại Ea Kar, Đắk Lắk. Cửa hàng chuyên cung cấp các loại ống nước nhựa, bơm điện, bồn nước cùng nhiều thiết bị và phụ kiện phục vụ nhu cầu cấp thoát nước, tưới tiêu và sinh hoạt.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Với danh mục sản phẩm đa dạng, Công Định hướng đến việc hỗ trợ khách hàng tìm kiếm vật tư phù hợp cho gia đình, công trình và hệ thống tưới tiêu.
            </p>

            <div className="space-y-3 border-t border-slate-200 pt-6">
              <div className="flex items-center text-slate-700">
                <MapPin className="text-red-600 mr-3 flex-shrink-0" size={20} />
                <span><strong>Cơ sở 1:</strong> 21 Quang Trung, Ea Kar, Đắk Lắk.</span>
              </div>
              <div className="flex items-center text-slate-700">
                <MapPin className="text-red-600 mr-3 flex-shrink-0" size={20} />
                <span><strong>Cơ sở 2:</strong> Km 56, Quốc lộ 26, Ea Kar, Đắk Lắk.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};