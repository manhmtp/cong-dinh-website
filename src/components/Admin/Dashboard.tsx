import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types';
import { COMPANY_INFO } from '../../constants/company';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Upload, ArrowLeft } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onBackToHome: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, onBackToHome }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(COMPANY_INFO.categories[0]);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const fetchAdminProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Lỗi lấy danh sách:', err);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setTitle(prod.title);
      setCategory(prod.category);
      setDescription(prod.description);
      setIsPublic(prod.is_public);
      setImageUrl(prod.image_url);
    } else {
      setEditingProduct(null);
      setTitle('');
      setCategory(COMPANY_INFO.categories[0]);
      setDescription('');
      setIsPublic(true);
      setImageUrl('');
    }
    setIsFormOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
    } catch (err: any) {
      alert('Lỗi tải ảnh lên: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Vui lòng tải ảnh đại diện cho sản phẩm');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title,
        category,
        description,
        image_url: imageUrl,
        is_public: isPublic,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([payload]);
        if (error) throw error;
      }

      setIsFormOpen(false);
      fetchAdminProducts();
    } catch (err: any) {
      alert('Lưu không thành công: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchAdminProducts();
    } catch (err: any) {
      alert('Xóa thất bại: ' + err.message);
    }
  };

  const togglePublic = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_public: !product.is_public })
        .eq('id', product.id);
      if (error) throw error;
      fetchAdminProducts();
    } catch (err: any) {
      alert('Cập nhật trạng thái thất bại: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBackToHome} className="text-gray-400 hover:text-white p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">TRANG QUẢN TRỊ - CÔNG ĐỊNH</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Đăng xuất</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Quản lý sản phẩm</h2>
            <p className="text-xs text-gray-500 mt-1">Tổng số sản phẩm: {products.length}</p>
          </div>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm sản phẩm mới</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Chưa có sản phẩm nào. Hãy nhấn "Thêm sản phẩm mới".</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                    <th className="p-4">Hình ảnh</th>
                    <th className="p-4">Tên sản phẩm</th>
                    <th className="p-4">Danh mục</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover border" />
                      </td>
                      <td className="p-4 font-bold text-slate-900">{p.title}</td>
                      <td className="p-4 text-gray-600">{p.category}</td>
                      <td className="p-4">
                        <button
                          onClick={() => togglePublic(p)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            p.is_public
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {p.is_public ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          {p.is_public ? 'Công khai' : 'Đang ẩn'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openForm(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Modal Form Thêm/Sửa */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Ví dụ: Ống nhựa PE Ø60mm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Danh mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {COMPANY_INFO.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mô tả sản phẩm</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Nhập mô tả chi tiết sản phẩm..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Hình ảnh đại diện</label>
                {imageUrl && (
                  <div className="mb-2 relative w-28 h-28 border rounded-lg overflow-hidden">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition border border-gray-300">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Đang tải lên...' : 'Tải ảnh từ thiết bị'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="is_public" className="text-sm font-semibold text-gray-700">Hiển thị công khai trên website</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-5 py-2 text-sm font-bold bg-red-700 hover:bg-red-800 text-white rounded-lg transition shadow"
                >
                  Lưu sản phẩm
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};