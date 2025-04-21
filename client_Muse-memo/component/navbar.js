export default function Navbar() {
    return (
      <div className="overflow-hidden flex justify-between items-center bg-[url(/poster-black.svg)] bg-no-repeat bg-center bg-[#4bba5b] bg-blend-overlay backdrop-blur-2xl w-full py-5 px-20 shadow-xl">
        <p className="text-center text-lg place-content-center hover:text-blue-700 cursor-pointer">
          Username
        </p>
        <div className="place-content-center">
          <button
            className="border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99 text-center"
            type="button"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }