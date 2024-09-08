import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/lib/auth";


export default async function Home() {

  const session = await auth() 

  

  return (
    <>

    
    <div className="bg-slate-900 text-white h-screen flex">
       <div className="mx-auto"> {session? `welcome ${session?.user?.name}`: ""} </div>
       
        <div className="mx-auto">
          {session? <SignOut/>: <SignIn/> } 
        </div>
        
    </div>

    </>
  );
}
