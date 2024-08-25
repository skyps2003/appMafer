export interface Product {
    id: number;
    name: string;
    description: string;
    img: string;
    price: number;
    created_by: number | null;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface DetailedProduct {
    id: number;
    product_id: number;
    category_id: number;
    provider_id: number;
    created_by: number | null;
    updated_by: number | null;
    created_at: string;
    updated_at: string;
    product: Product;
  }
  export interface Customer {
    id: number;
    name: string;
    surname: string;
    image: string;
    dni: string;
    ruc: string;
    customer_type_id: number;
    reason: string;
    address: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Inventory {
    id: number;
    stock: number;
    status: number;
    detailed_product_id: number;
    location: string;
    expiration_date: string;
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
    detailed_product: DetailedProduct;
  }
  
  export interface Sale {
    id: number;
    total_sale: string;
    total_quantity: number;
    customer_id: number;
    inventory_id: number;
    payment_method_id: number;
    created_at: string;
    updated_at: string;
    inventory: Inventory;
    customer: Customer;
  }
  
  export interface Order {
    id: number;
    status: string;
    sale_id: number;
    created_at: string;
    updated_at: string;
    sale: Sale;
    image: string
  }
  
  export interface OrderResponse{
    message: string
    data: Order[]
  }