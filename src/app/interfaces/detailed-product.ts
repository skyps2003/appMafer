export interface DetailedProduct {
    id: number,
    product_id: number,
    category_id: number,
    provider_id: number,
    product: {
        id:number,
        name: string,
        description: string,
        img: string,
        price:number
    },
    provider: {
        id: number,
        name: string,
        ruc: string,
        phone: string,
        email: string,
        reason: string
    },
    category: {
        id: number,
        name: string,
        description: string
    }
}
