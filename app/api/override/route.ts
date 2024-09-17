import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request){


    const body = await req.json()

    const {date} = body

    const session = await getAuthSession()

    if(!session?.user){

    return new Response("unauthorized access",
        {
            status:401,
        }
    )  }

    await db.override.create({
        data:{
            date:date,
            userId:session?.user.id
        }
        
    })
    

}