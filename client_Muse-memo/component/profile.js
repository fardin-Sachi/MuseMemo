"use client"
import isAuthenticated from "@/lib/authenticatedUser";
import getUser from "@/lib/getUser";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
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

        const userData = await getUser(username.username);
        const formattedDate = new Date(userData?.dateOfBirth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        userData.dateOfBirth = formattedDate
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    
    authenticateAndFetchUser()
  }, [username, router])

    return (
      <div className="min-h-full flex flex-col bg-w-full px-20 pb-6">
        {/* User's Full Name */}
        <div>
          <p className="text-center text-4xl font-bold p-4">{user?.name || "User's Full Name"}</p>
        </div>
        {/* {console.log("User:",user)} */}


        {/* Edit Button */}
        <div className="flex justify-end">
          <button type="button" className="px-0">
            <p className="text-right text-lg hover:text-blue-700 cursor-pointer">Edit Profile</p>
          </button>
        </div>
  
        {/* User Info */}
        <div className="flex flex-row pb-10">
          <div className="pr-10 text-2xl">
            <p>Username</p>
            <p>Email</p>
            <p>Date of Birth</p>
            <p>Gender</p>
          </div>
          <div className="text-2xl">
            <div className="flex">
              <p>:&nbsp;</p>
              <p>{user?.username || "User's username"}</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>{user?.email || "User's Email"}</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>{user?.dateOfBirth.toString() || "User's Birthdate"}</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>{user?.gender.charAt(0).toUpperCase()+ user?.gender.slice(1) || "User's Gender"}</p>
            </div>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex flex-col justify-center space-y-6 w-2xs self-center">
          <button className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 hover:bg-[#B5FCCD]/99">
            <p className="text-center text-lg">{user?.username}&apos;s blogs</p>
          </button>
          <button className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 hover:bg-[#B5FCCD]/95">
            <p className="text-center text-lg">Change Password</p>
          </button>
          <button className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 hover:bg-[#B5FCCD]/95">
            <p className="text-center text-red-700 text-lg">Delete Account</p>
          </button>
        </div>
      </div>
    );
  }
  