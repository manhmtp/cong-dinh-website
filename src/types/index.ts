export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  is_public: boolean;
  created_at?: string;
}