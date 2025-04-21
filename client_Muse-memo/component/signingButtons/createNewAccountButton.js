"use client"

import { redirect } from "next/navigation"

export default function CreateNewAccountButton() {
  return (
    <div className='pt-5'>
        <button onClick={() => redirect("/signup")} className='w-full border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99'>Create New Account</button>
    </div>
  )
}
