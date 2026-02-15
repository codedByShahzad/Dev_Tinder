"use client"

import { useMutation } from "@tanstack/react-query"
import { LoginUser, LoginPayLoad } from "../services/auth.service"
import { useRouter } from "next/navigation";

export const useLogin = () =>{
    const router = useRouter()

    return useMutation({
        mutationFn: (data: LoginPayLoad) => LoginUser(data),

        onSuccess: () =>{
            router.push("/")
        },
        onError:(err: any) =>{
            console.log(err)
        }
    })
}