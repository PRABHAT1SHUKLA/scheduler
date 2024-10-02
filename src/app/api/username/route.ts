import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req:NextApiRequest, res:NextApiResponse){
  const session = await getAuthSession()

  if(!session || !session?.user){
    return new Response("User not authorized" ,{
      status: 401
    })
  }

  const {username}  = await req.body

   const existingUser  =  await db.user.findUnique({
    where:{
      username
    },
   })
     
     const userId = session.user.id
    
    if(existingUser && existingUser.id !== userId){ 
       return new Response("username is already taken")
    }

    await db.user.update({
      where:{ id : userId},
      data:{username}
    })


    return res.status(200).json({
      msg:"username updated"
    })
}

