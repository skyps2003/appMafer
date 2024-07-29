export interface Product {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
  created_by?: number | null; 
  updated_by?: number;        
  created_at?: string;        
  updated_at?: string;       
}

export interface ProductResponse {
  message: string;
  data: Product[];
}
