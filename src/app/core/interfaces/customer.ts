export interface Customer {
    id: number,
    name: string,
    surname: string,
    dni: string,
    ruc: string,
    customer_type_id: number,
    reason: string,
    address: string,
    email: string,
    phone: string
    customer_type: {
      id: number,
      name: string,
    }
}
