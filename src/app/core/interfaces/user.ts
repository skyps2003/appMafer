export interface User {
    id: number,
    name: string,
    surName: string,
    addres: string,
    email: string,
    gender: number,
    rol_id: number,
    password: string,
    img: string,
    password_confirmation: string,
    rol: {
        id: string,
        name: string, 
        description: string
    },
    
    created_at: Date,
    updated_at: Date
}

export interface UserResponse{
    message: string
    data: User[]
}

export interface ResponseUser{
    message: string
    data: User
}
