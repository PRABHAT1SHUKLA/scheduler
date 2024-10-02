import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(
  req:NextApiRequest,
  res:NextApiResponse
){

  const {username} =  req.body

  const user = await db.user.findUnique({
    where:{ username },
    select:{
       id : true ,
       name : true ,
       email: true,
       image:true,
       events:{
        where:{
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select:{
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count:{
            select: {
              bookings: true,
            }
          }

        }

    } 

       



    }
  });

  return  res.status(200).json({
     user: user
  })
}