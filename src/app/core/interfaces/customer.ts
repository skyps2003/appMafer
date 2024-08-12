export interface Customer {
    id: number,
    name: string,
    surname: string,
    dni: string,
    ruc: string,
    reason: string,
    address: string,
    email: string,
    phone: string
    customer_type: {
      id: number,
      name: string,
    }
}

export interface CustomerResponse{
  message: string
  data: Customer[]
}
