"use server"
import { createSession, deleteSession } from "@/lib/session"
import { redirect } from "next/navigation"
import {z} from "zod"

const loginSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must not exceed 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters"})
        .trim(),
})

export async function login(prevState, formData) {
    try {
        const isValidFormData = loginSchema.safeParse(Object.fromEntries(formData))
        if(!isValidFormData.success) {
            return{
                errors: result.error.flatten().fieldErrors,
            }
        }

        const result = await fetch("http://localhost:8000/api/users/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
            })
        })
        if(!result.ok){
            const errorData = await result.json()
            return {
                errors: {
                    username: [errorData.error]
                }
            }
        }

        const data = await result.json()
        // console.log("Data: ",data)
        
        await createSession(data._id, data.username)
        
        return { redirectUrl: `/home/${data.username}` }
    } catch (error) {
        console.error("Login Error:", error);
        return { errors: { general: ["Something went wrong. Try again later."] } };
    }
}

export async function logout() {
    await deleteSession()
    redirect("/")
}