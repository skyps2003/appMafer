export interface Inventory {
    id?: number,
    stock: number,
    status?: number,
    detailed_product_id: number,
    location: string,
    expiration_date?: Date,
    detailed_product?:{
        id: number,
        product_id: number,
        category_id:number,
        provider_id: number
        product:{
            name: string,
            description: string,
            img: string,
            price: number
        }
    }
}
