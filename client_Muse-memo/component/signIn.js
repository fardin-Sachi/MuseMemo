"use client"

import Image from "next/image";
import poster from "@/public/poster-black.svg"
import { useActionState, useEffect } from "react";
import { login } from "@/login/loginAction";
import CreateNewAccountButton from './signingButtons/createNewAccountButton'
import SubmitButton from "./signingButtons/submitButton";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(login, undefined)

    useEffect(() => {
        if(state?.redirectUrl) {
            router.push(state.redirectUrl)
        }
    }, [state, router])

  return (
    <div className='flex h-screen'>
        {/* SignIn */}
        <div className='grid place-content-center w-screen'>
            {/* <p className='text-center'>Log into MuseMemo</p> */}
            <form action={formAction} className='flex flex-col space-y-2.5'>
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='text'
                    name="username" 
                    placeholder='Enter username'
                    required
                />
                {state?.errors?.username && 
                    <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.username}</p>
                }
                
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='password'
                    name="password" 
                    placeholder='Enter your password'
                    // onChange={handleChange}
                    required
                />
                {state?.errors?.password && 
                    <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.password}</p>
                }
                {isPending? <SubmitButton param={"Pending..."} /> : <SubmitButton param={"Log In"} /> }
                
            </form>
            
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
