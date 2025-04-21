"use client"
import { useState } from 'react'
import { loginUser } from '@/services/authService'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Form from 'next/form'
import poster from "@/public/poster-black.svg"
import CreateNewAccountButton from './signingButtons/createNewAccountButton'

export default function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(formData);
            console.log("Logged in:", data);
            router.push("/dashboard"); // or any other page
        } catch (err) {
            setError(err.message);
        }
    }

  return (
    <div className='flex h-screen'>
        {/* SignIn */}
        <div className='grid place-content-center w-screen'>
            {/* <p className='text-center'>Log into MuseMemo</p> */}
            <Form onSubmit={handleSubmit} className='flex flex-col space-y-2.5' action="/search">
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='email'
                    name="email" 
                    placeholder='Email'
                    onChange={handleChange}
                    required
                />
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='password'
                    name="password" 
                    placeholder='Enter your password'
                    onChange={handleChange}
                    required
                />
                <button 
                    className='border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99' 
                    type="submit"
                >Log In</button>
                {error && <p className="text-red-500">{error}</p>}
            </Form>
            
            <button
                className='pt-2'
                type='submit'
            >
               <p className='text-center hover:text-blue-700 cursor-pointer'>Forgot password?</p>
            </button>
            <CreateNewAccountButton />
        </div>

        {/* Poster */}
        <div className='grid place-content-center w-screen'>
            <Image 
                className=''
                src={poster}
                alt='MuseMemo Poster/Logo'
            />
        </div>
    </div>
  )
}
