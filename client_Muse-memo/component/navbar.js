"use client"
import isAuthenticated from "@/lib/authenticatedUser";
import getUser from "@/lib/getUser";
import { logout } from "@/login/loginAction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const username = useParams()
    const [user, setUser] = useState(null)
    const router = useRouter()
  
    useEffect(() => {
        if (!username.username) return;
    
        async function authenticateAndFetchUser() {
            try {
              const isUserAuthenticated = await isAuthenticated(username.username)
              if(!isUserAuthenticated){
                router.push("/")
                return
              }
      
              const res = await fetch(`http://localhost:8000/api/users/${username.username}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
              if(!res.ok){
                const errorData = await res.json()
                return {
                  errors: {
                    username: [errorData.error],
                  },
                }
              }
              const data = await res.json()

              setUser(data);
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          }
          
        authenticateAndFetchUser()
    }, [username, router])
    return (
      <div className="overflow-hidden flex justify-between items-center bg-[url(/poster-black.svg)] bg-no-repeat bg-center bg-[#4bba5b] bg-blend-overlay backdrop-blur-2xl w-full py-5 px-20 shadow-xl">
        <p className="text-center text-lg place-content-center hover:text-blue-700 cursor-pointer">
          {user?.username}
        </p>
        <div className="place-content-center">
          <button
            className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99 text-center"
            type="button"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }