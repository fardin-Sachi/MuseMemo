export default function Profile() {
    return (
      <div className="min-h-full flex flex-col bg-w-full px-20 pb-6">
        {/* User's Full Name */}
        <div>
          <p className="text-center text-4xl font-bold p-4">User&apos;s Full Name</p>
        </div>
  
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
              <p>Username</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>Email</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>Date of Birth</p>
            </div>
            <div className="flex">
              <p>:&nbsp;</p>
              <p>Gender</p>
            </div>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex flex-col justify-center space-y-6 w-2xs self-center">
          <button className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 hover:bg-[#B5FCCD]/99">
            <p className="text-center text-lg">Username&apos;s blogs</p>
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
  