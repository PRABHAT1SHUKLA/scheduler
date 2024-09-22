import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


//route handles admin request for availability creation
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorizeed", {
        status: 401
      })
    }

    const { day, startTime, endTime } = await req.json()

    await db.weeklyavailability.create({
      data: {
        dayOfWeek: day,
        start: startTime,
        end: endTime,
        userId: session.user.id
      }
    })
    return new Response("OK")
  }
  catch (error: any) {
    return new Response(error)
  }
}



export async function GET(req: Request) {
  try {
   
    const session = await getAuthSession()



    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401
      })
    }

    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        availability: true
      },
    })

    if(!user) {
      return new Response ("user not found ", {
        status: 404
      })
    }

    return NextResponse.json(user.availability)
  }

  catch (error: any) {
    return new Response(error)

  }
}