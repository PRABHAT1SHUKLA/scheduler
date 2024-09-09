import { getAuthSession } from "@/lib/auth";



export default async function Home() {

  const session = await getAuthSession()

  

  

  return (
    <>

    
    <div className="bg-gradient-to-r from-stone-700 to-emerald-800 text-white h-screen flex">
       <div className="mx-auto"> {session? `welcome ${session?.user?.name}`: ""} </div>
       
   
        
    </div>

    </>
  );
}
