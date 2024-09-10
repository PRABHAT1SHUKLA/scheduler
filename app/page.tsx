import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";



export default async function Home() {

  const session = await getAuthSession()

  

  

  return (
    <>

    
    <div className="font-bold text-3xl h-screen flex items-center tdxt-center flex-col">
      
        
      
     <div> Welcome to muzer</div> 
      
      <div className="text-sm divide-y">
      <div className=" justify-between p-4 text-zinc-500 gap-x-4 max-w-2xl overflow-auto">
      <p> muzer gives a interactive experience to create customized streams for your experience . It can also act as your part DJ by playing the public's favourite based on the most upvoted song.</p>
      </div>
       {session? <Link href={`/createStream`} className={cn(buttonVariants({variant:"ghost"}),"w-full gaps-x-2")}>Create Stream</Link>:<Link href="/sign-in" className={cn(buttonVariants({variant:"ghost"}),"w-full gaps-x-2")}>LogIn to create Stream</Link>}
        
      </div>
     
    
       
   
        
    </div>

    </>
  );
}
