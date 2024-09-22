import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";



export default async function Home() {

  const session = await getAuthSession()

  

  

  return (
    <>

    
    <div className="font-bold text-3xl h-screen flex items-center tdxt-center flex-col">
      
        
      
     <div> Welcome to scheduler </div> 
      
      <div className="text-sm divide-y">
      <div className=" justify-between p-4 text-zinc-500 gap-x-4 max-w-2xl overflow-auto">
      <p> Scheduler helps to keep your meetings and Engagemens at one place. </p>
      </div>
       {session? <Link href={`/createStream`} className={cn(buttonVariants({variant:"ghost"}),"w-full gaps-x-2")}></Link>:<Link href="/sign-in" className={cn(buttonVariants({variant:"ghost"}),"w-full gaps-x-2")}>LogIn to create Stream</Link>}
        
      </div>
     
    
       
   
        
    </div>

    </>
  );
}
