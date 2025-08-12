"use server"
import { createSession, deleteSession } from "@/lib/session"
import { redirect } from "next/navigation"
import {z} from "zod"


const singUpSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must not exceed 50 characters" })
        .trim(),
    
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must not exceed 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .trim(),

    email: z.string()
        .email({ message: "Invalid email address" })
        .trim(),

    dateOfBirth: z.string()
        .refine((value) => !isNaN(Date.parse(value)), { message: "Invalid date format" }),

    gender: z.enum(["male", "female", "other"], { message: "Gender must be male, female, or other" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must include at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must include at least one special character (@, $, !, %, *, ?, &, #)" })
        .trim(),
})

export async function signup(prevState, formData) {
    try {
        const isValidFormData = singUpSchema.safeParse(Object.fromEntries(formData))
        if(!isValidFormData.success) {
            return{
                errors: isValidFormData.error.flatten().fieldErrors,
            }
        }
        
        const result = await fetch("http://localhost:8000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                username: formData.get("username"),
                email: formData.get("email"),
                dateOfBirth: new Date(formData.get("dateOfBirth")),
                gender: formData.get("gender"),
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
                    .catch(() => ({ error: "Invalid response from server" }))
        
        await createSession(data._id, data.username)

        return { redirectUrl: "/home" }
    } catch (error) {
        console.error("Signup Error:", error);
        return { errors: { general: ["Something went wrong. Try again later."] } };
    }
}