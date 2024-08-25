export interface Rol {
    id: number,
    name: string,
    description: string
}

export interface RolResponse{
    message: string
    data: Rol[]
}
