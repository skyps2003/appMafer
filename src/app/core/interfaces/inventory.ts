export interface Inventory {
    id: number;
    stock: number;
    status?: number;
    detailed_product_id: number;
    location: string;
    expiration_date?: Date;
    product: {
        name: string;
        description: string;
        img: string;
        price: number;
    };
    provider_id: number;
    category: {
        id: number
        name: string;
    };
}

export interface Category {
    id: number;
    name: string;
}

export interface InventoryResponse {
    message: string;
    data: {
        inventories: Inventory[];
        categories: Category[];
    };
}