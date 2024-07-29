export interface Company {
    id: number
    name: string
    description: string
    img: string
    phone: string
    address: string
}

export interface CompanyResponse{
    message: string
    data: Company
}
