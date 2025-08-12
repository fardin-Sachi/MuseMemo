export default function SubmitButton( {param} ) {
  return (
    <button 
        className='border-[#B5FCCD] rounded-md p-2 bg-[#B5FCCD]/80 cursor-pointer hover:bg-[#B5FCCD]/99' 
        type="submit"
    >{param}</button>
  )
}
