export default function Blog() {
    return (
      <div className="w-full h-full py-10">
  
        <div className='bg-[#B5FCCD] w-[50%] mx-auto border-[#4bba5b] rounded-lg shadow-2xl py-10 overflow-hidden px-8'>
        
            <div className="flex justify-between flex-wrap">
              <p className="text-lg font-bold">Author</p>
              <p className="text-xs">Time of Creation</p>
            </div>
            <div className="flex justify-between flex-wrap">
              <p className="text-2xl font-bold">Blog Title</p>
            </div>
            <div className="flex justify-between pb-8">
              <p className="text-lg">Blog Content</p>
            </div>
            {/* Comments */}
            <div>
              <p className="text-xl font-bold">Comments</p>
              <hr className="border-gray-500 pb-4"></hr>
              <div className="py-2">
                <div className="flex justify-between place-items-center">
                  <div className="">
                    Author
                  </div>
                  <div className="text-xs">
                    Time of commenting
                  </div>
                </div>
                <div>
                  Comment content
                </div>
              </div>
              
            </div>

            <div className="flex flex-col space-y-2">
              <input 
                  className='border-2 rounded-md p-2 placeholder:text-black' 
                  type='text'
                  name="comment" 
                  placeholder='Add a comment'
                  required
              />

              <button
                  className='w-[30%] place-self-center rounded-md p-2 bg-[#4bba5b]/80 cursor-pointer hover:bg-[#B5FCCD]'
                  type='submit'
              >
                <p className='text-center cursor-pointer'>Add comment</p>
              </button>

            </div>
        </div>
        
        
      </div>
    )
  }