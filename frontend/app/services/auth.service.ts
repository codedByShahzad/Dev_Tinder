import { api } from "../lib/axios";

export interface LoginPayLoad{
    email:string,
    password: string
}

export const LoginUser = async(data: LoginPayLoad) =>{
    const response = await api.post("/login", data)
    return response.data
}

export const logoutUser = async() =>{
    const response = await api.post("/logout")
    return response.data
}