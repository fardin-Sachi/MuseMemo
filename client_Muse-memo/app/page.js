
import SignIn from "@/component/signIn";

export default function SigninPage() {
  return (
    <div className="bg-[#4bba5b]/50 h-screen">
      {/* {console.log(process.env.SESSION_SECRET)} */}
      <SignIn />
      
    </div>
  );
}
