"use client"
import HaveAnAccountButton from "@/component/signingButtons/haveAnAccountButton"
import { signup } from "@/login/signUpAction"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"


export default function SignUpForm() {
    const router = useRouter()
    const [state, signUpAction, isPending] = useActionState(signup, undefined)
    
    useEffect(() => {
        if(state?.redirectUrl) {
            router.push(state.redirectUrl)
        }
    }, [state?.redirectUrl, router])

  return (
        <div className='bg-[url(/poster-black.svg)] bg-no-repeat bg-bottom bg-[#4bba5b]/50 bg-blend-overlay h-screen grid place-content-start justify-center py-10 w-screen'>

            <form action={signUpAction} className='flex flex-col space-y-2.5 min-w-max'>
            
                {/* Name and username */}
                <div className="flex space-x-1">
                    <input 
                        className='border-2 rounded-md p-2 placeholder:text-black' 
                        type='text'
                        name="name" 
                        placeholder='Full Name'
                        minLength={"5"}
                        required
                    />
                    {state?.errors?.name && 
                        <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.name}</p>
                    }
                    <input 
                        className='border-2 rounded-md p-2 placeholder:text-black' 
                        type='text'
                        name="username" 
                        placeholder='Username'
                        minLength={"4"}
                        required
                    />
                    {state?.errors?.username && 
                        <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.username}</p>
                    }
                </div>
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='email'
                    name="email" 
                    placeholder='Enter your email'
                    required
                />
                {state?.errors?.email && 
                    <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.email}</p>
                }
                <div className="flex flex-col">
                    <p>Date of Birth</p>
                    <input 
                        className='border-2 rounded-md p-2 flex-1' 
                        type='date'
                        name="dateOfBirth" 
                        required
                    />
                    {state?.errors?.dateOfBirth && 
                        <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.dateOfBirth}</p>
                    }
                </div>

                {/* Gender Radio Buttons */}
                <div className="">
                    <p>Gender</p>
                    <div className="flex justify-between space-x-1">
                            <label className="flex justify-between border-2 rounded-md p-2 w-full" for="male">Male
                            <input 
                                id="male"
                                className='' 
                                type='radio'
                                name="gender" 
                                value={"male"}
                                required
                            /></label>
                            <label className="flex justify-between border-2 rounded-md p-2 w-full" for="female">Female
                            <input 
                                id="female"
                                className='' 
                                type='radio'
                                name="gender" 
                                value={"female"}
                                required
                            /></label>
                            <label className="flex justify-between border-2 rounded-md p-2 w-full" for="other">Other
                            <input 
                                id="other"
                                className='' 
                                type='radio'
                                name="gender" 
                                value={"other"}
                                required
                            /></label>
                    </div>
                </div>
                
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='password'
                    name="password" 
                    placeholder='Enter your password (8 characters minimum)'
                    minLength={"8"}
                    required
                />
                {state?.errors?.password && 
                    <p className="text-red-500 text-sm max-w-xs break-all">{state.errors.password}</p>
                }

                <button 
                    className='border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99' 
                    type="submit"
                >{isPending? "Pending..." : "Sign Up"}</button>
            </form>
            <HaveAnAccountButton />
            
        </div>
  )
}
