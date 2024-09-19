import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request){
    try{
        const body = await req.json()

    const { duration , eventType } = body

    const session = await getAuthSession()

    if(!session?.user){
        return new Response("User not Authorized", { status: 401 })
    }

    await db.event.create({
        data:{
            duration: duration,
            userId: session.user.id,
            eventType: eventType

        }
    })

    return new Response("OK")

    }
    catch(error){
        return new Response("Sorry")
    }
    


}