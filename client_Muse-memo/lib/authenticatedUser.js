"use server"
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function isAuthenticated(username) {
    try {
        const result = await fetch(`http://localhost:8000/api/users/authorization/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!result.ok) {
            const errorData = await result.json()
            return {
                errors: {
                    username: [errorData.error],
                },
            }
        }
        
        const data = await result.json()

        const cookie = await cookies()
        const session = await decrypt(cookie.get('session')?.value)
        if(data._id === session?.userId && data.username === session?.username){
            return true
        }
        return false
        } catch (error) {
            console.error("Error fetching data: ", error)
            return null
        }
}
