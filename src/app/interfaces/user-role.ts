export interface UserRole {
  id: number,
  user_id: number,
  rol_id: number,
  status: number,
  rol: {
    id: number,
    name: string,
  },
  user: {
    id: number,
    name: string,
    surName: string,
    img: string,
  }
}
