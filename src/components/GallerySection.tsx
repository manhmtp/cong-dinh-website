import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryImages = [
    {
      url: '/images/signboard.jpg',
      title: 'Biển hiệu chính cửa hàng Công Định',
      desc: 'Nhận diện thương hiệu chính thức tại Ea Kar'
    },
    {
      url: '/images/pipes.jpg',
      title: 'Trưng bày các loại ống nước',
      desc: 'Kho ống nước nhựa đa dạng kích thước'
    },
    {
      url: '/images/shelves.jpg',
      title: 'Khu vực vật tư & phụ kiện',
      desc: 'Đầy đủ van, co, tê và thiết bị tưới'
    },
    {
      url: '/images/warehouse.jpg',
      title: 'Kho hàng quy mô lớn',
      desc: 'Sẵn sàng phục vụ cho các công trình lớn nhỏ'
    }
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            HÌNH ẢNH CỬA HÀNG CÔNG ĐỊNH
          </h2>
          <p className="mt-4 text-slate-400">
            Hình ảnh thực tế từ cơ sở sản xuất và khu vực trưng bày sản phẩm Công Định.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img.url)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-slate-800 shadow-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white leading-tight">{img.title}</p>
                <p className="text-xs text-slate-300 mt-1">{img.desc}</p>
              </div>
              <div className="absolute top-3 right-3 bg-slate-900/70 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal xem phóng to ảnh */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white hover:text-red-400 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={activeImage}
            alt="Phóng to hình ảnh"
            className="max-w-full max-h-[85vh] rounded-xl object-contain border border-slate-800 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};