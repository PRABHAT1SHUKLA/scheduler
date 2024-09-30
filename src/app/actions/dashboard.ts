"use server"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";

export async function getLatestUpdates(){
  const session  = await getAuthSession()

  if(!session || !session?.user?.id){
     throw new Error("Unauthorized to see this page");
  }

  const user = await db.user.findUnique({
    where:{
         id: session.user.id
    }
  })

  if(!user){
    throw new Error("user not found")
  }

  const current = new Date();

  const UpcomingMeetings = await db.booking.findMany({
    where:{
      userId: user.id,
      startTime:{gte:current},
    },
    include:{
      event:{
        select:{
          title:true,
        },
      },
    },
    orderBy:{
      startTime:"asc",
    },
    take:3,
  });

  return UpcomingMeetings;
}