export interface Category {
    id?: number;
    name: string;
    description?: string;
}

export interface CategoryResponse{
    message: string;
    data: Category[]
}
