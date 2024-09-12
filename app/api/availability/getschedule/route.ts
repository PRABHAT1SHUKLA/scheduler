import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
    const session = await getAuthSession()

    if(!session?.user){
        return new Response("Unauthorized",{
            status: 401
        })
    }

    const day = await db.weeklyavailability.findMany({
        where:{
            userId: session.user.id
        }
    })

    

    return new Response(
        `msg:${day[1].dayOfWeek}`
    )
}