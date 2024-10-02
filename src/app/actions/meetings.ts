"use server"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

interface meetingProps{
  type: string 
}

export async function getUserMeetings({type="upcoming"} : meetingProps){
  
  const session = await getAuthSession()

  if(!session || !session?.user){
    throw new Error("not Authorized")
  }

  const user = await db.user.findUnique({
    where:{
      id: session.user.id
    }
  })

  if(!user){
    throw new Error("User not found")
  }

  const now = new Date();

  const meetings = await db.booking.findMany({
    where:{
      userId: user.id,
      startTime: type==="upcoming"? {gte: now}: {lt: now}
    },
    include:{
      event:{
        include:{
          user:{
            select:{
            name: true,
            email: true,
            }
          }
        }
      }
    },
    orderBy:{
      startTime: type==="upcoming"? "asc": "desc"
    },

  });

  return meetings;

}

export async function cancelMeeting(meetingId : string){
  const session = await getAuthSession()

  if(!session || !session?.user){
    throw new Error("not Authorized")
  }

  const user = await db.user.findUnique({
    where:{
      id: session.user.id
    }
  })

  if(!user){
    throw new Error("User not found")
  }

  const meeting 
}