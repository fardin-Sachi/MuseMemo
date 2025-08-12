export default function HomePage() {
  return (
    <div className="w-full py-10 space-y-10 flex-grow">
      
      <div className='bg-[#B5FCCD] w-[50%] mx-auto border-[#4bba5b] rounded-lg shadow-2xl py-10 overflow-hidden px-8'>
      
        <div className="flex justify-between flex-wrap">
            <p className="text-lg font-bold">Author</p>
            <p className="">Time of Creation</p>
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="text-2xl font-bold">Blog Title</p>
        </div>
        <div className="flex justify-between pb-8">
          <p className="text-lg">Blog Content</p>
        </div>

        {/* Comments */}
        <div className="">
          <p className="text-xl font-bold">Comments</p>
          <hr className="border-gray-500 pb-4"></hr>
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

      
      


      
    </div>
    
  )
}