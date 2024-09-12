import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req:Request){
    const { dayOfWeek }= await req.json()
    const session = await getAuthSession()

    if(!session?.user){
        return new Response("Unauthorized",{
            status: 401
        })
    }

    const availabilities = await db.weeklyavailability.findMany({
        where: {
          userId: session.user.id,
          dayOfWeek: dayOfWeek,
        },
        select: {
          start: true,
          end: true,
        },
      })

      const fusk = JSON.stringify(availabilities)
    

    return new Response(fusk)
}