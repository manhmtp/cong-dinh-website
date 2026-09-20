import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import { COMPANY_INFO } from '../constants/company';
import { PhoneCall, Tag } from 'lucide-react';

export const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPublicProducts();
  }, []);

  const fetchPublicProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Lỗi khi tải danh sách sản phẩm:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SẢN PHẨM CỦA CÔNG ĐỊNH
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Khám phá các dòng sản phẩm và vật tư ngành nước được cung cấp tại Công Định.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('Tất cả')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              selectedCategory === 'Tất cả'
                ? 'bg-red-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          {COMPANY_INFO.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Đang tải danh mục sản phẩm...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Chưa có sản phẩm nào thuộc danh mục này.</p>
            <p className="text-xs text-gray-400 mt-1">Vui lòng cập nhật sản phẩm trong trang Quản trị Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3 text-red-400" />
                    {product.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  <a
                    href={`tel:${COMPANY_INFO.phones[1].replace(/\s/g, '')}`}
                    className="w-full bg-red-50 hover:bg-red-700 text-red-700 hover:text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Liên hệ tư vấn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};