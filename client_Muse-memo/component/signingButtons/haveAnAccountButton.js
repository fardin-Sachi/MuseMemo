"use client"

import { redirect } from "next/navigation"

export default function HaveAnAccountButton() {
  return (
    <div className='pt-5'>
        <button onClick={() => redirect("/")} className='w-full border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99'>Have an account?</button>
    </div>
  )
}