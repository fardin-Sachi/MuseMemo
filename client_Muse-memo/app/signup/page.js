import HaveAnAccountButton from "@/component/signingButtons/haveAnAccountButton"
import Form from "next/form"

export default function SignUp() {
  return (
        <div className='bg-[url(/poster-black.svg)] bg-no-repeat bg-bottom bg-[#4bba5b]/50 bg-blend-overlay h-screen grid place-content-start justify-center py-10 w-screen'>

            <Form className='flex flex-col space-y-2.5 min-w-max' action="/search">
            
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
                    <input 
                        className='border-2 rounded-md p-2 placeholder:text-black' 
                        type='text'
                        name="username" 
                        placeholder='Username'
                        minLength={"4"}
                        required
                    />
                </div>
                <input 
                    className='border-2 rounded-md p-2 placeholder:text-black' 
                    type='email'
                    name="email" 
                    placeholder='Enter your email'
                    required
                />

                <div className="flex flex-col">
                    <p>Date of Birth</p>
                    <input 
                        className='border-2 rounded-md p-2 flex-1' 
                        type='date'
                        name="birthdate" 
                        required
                    />
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

                <button 
                    className='border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99' 
                    type="submit"
                >Sign up</button>
            </Form>
            <HaveAnAccountButton />
            
        </div>
  )
}
