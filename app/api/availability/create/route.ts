import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request){
    try{

        console.log("hello")
        const body = await req.json()
       
        const {day , startTime , endTime} = body

       

       const session = await getAuthSession()

      if(!session?.user){
      return new Response("Unauthorizeed",{
        status:401
      })    
    }

    await db.weeklyavailability.create({
        data:{
            dayOfWeek:day,
            start: startTime,
            end: endTime,
            userId: session.user.id

        }
    })
    return new Response("OK")
    }
    catch(error){
        return new Response("sorry")
    }
}