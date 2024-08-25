export interface Provider {
    id: number
    ruc: string
    name: string
    phone: string
    email: string
    address: string
    reason: string
}

export interface ProviderResponse{
    message: string
    data: Provider[]
}
