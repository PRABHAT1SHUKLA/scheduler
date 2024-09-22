import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request){

 try{
    const body = await req.json()

    const {date, start , end} = body

    const session = await getAuthSession()

    if(!session?.user){

    return new Response("unauthorized access",
        {
            status:401,
        }
    )  }

    console.log("ello")
    if (!date || isNaN(Date.parse(date))) {
        return new Response("Invalid date format", {
          status: 400,
        });
      }
  
      await db.override.create({
        data: {
          date: new Date(date), // Ensure the date is correctly parsed as a JavaScript Date object
          start: start,
          end: end,
          userId: session.user.id,
        },
      });
    
    return new Response("OK")

 }catch(error){
    return new Response("fuck")

 }
    
}