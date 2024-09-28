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
    return new Response(`Availability created for ${day}`)
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

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        availability: {
          include:{ days:true}
        }
      },
    })

    if(!user || !user?.availability) {
      return null
    }
  
    const data = {
      timeGap : user.availability.timeGap
    };

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
  ].forEach((day) => {
    const dayAvailability = user.availability?.days.find((d) => d.day === day.toUpperCase());

     data[day] ={
      isAvailable : !!dayAvailability,
      startTime: dayAvailability? dayAvailability.startTime.toISOString().slice(11,16)
      : "09:00",
      endTime: dayAvailability? dayAvailability.endTime.toISOString().slice(11,16): "17.00"
     }

     

  })

  return data;


  }



  catch (error: any) {
    return new Response(error)

  }
}