import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { eventSchema } from "@/lib/validators/event";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse){
  const eventBody = req.body,

  const session = await getAuthSession()

   
  
  if(!session || !session.user.id){
   return new Response("user not authorized ", {
    status: 401
   })
  }
  
   
  const validatedData = eventSchema.parse(eventBody)

  const user = await db.user.findUnique({
    where:{
      id: session.user.id
    }
  })

  if(!user){
    return new Response("user not found")
  }

  const event = await db.event.create({
    data:{
      ...validatedData,
      userId: user.id
    },
  });
  return res.status(200).json(event)


}


export async function GET(res:NextApiResponse){
  const session = await getAuthSession()

  if(!session || !session?.user){
    return new Response("user not authorized", {
      status : 401
    }) 
  }

  const user = await db.user.findUnique({
    where:{
      id : session.user.id

    }
  })

  if(!user ){
    return new Response("user not found")
  }

  const events = await db.event.findMany({
    where:{
      userId: user.id
    },
    orderBy:{
      createdAt: "desc"
    },
    include:{
      _count:{
        select:{bookings:true},
      },
    },
  });

  return res.status(200).json({
     events,
     username: user.name
  })
}
