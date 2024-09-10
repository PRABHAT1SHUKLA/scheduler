import { getAuthSession } from "@/lib/auth";



export default async function Home() {

  const session = await getAuthSession()

  

  

  return (
    <>

    
    <div className="font-bold text-3xl h-screen flex flex-col">
      
        hello
       
   
        
    </div>

    </>
  );
}
