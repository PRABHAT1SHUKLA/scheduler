"use server"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function deleteEvent(eventId:string){
  const session = await getAuthSession()
  
  if(!session || !session?.user.id){
    throw new Error(
      "You must be logged in to delete an event"
    )
  }

  const user = await db.user.findUnique({
    where:{
      id: session.user.id,
    }
  });
 
   if(!user){
    throw new Error("User not found")
   }

   const event = await db.event.findUnique({
    where:{
      id:eventId
    }
   })

   if(!event || event.userId !== user.id){
    throw new Error("Event not found or unauthorized")
   }

   await db.event.delete({
    where:{
      id: eventId
    }
   })

   return { sucess: true}

}


export async function getEventDetails(username: string, eventId : string){
   
   const event = await db.event.findFirst({
    where:{
      id: eventId,
      user:{
        username: username,
      },
    },

    include:{
      user:{
        select:{
          name: true,
          email: true,
          image: true
        },
      },
    },
   }),

   return event ;


}