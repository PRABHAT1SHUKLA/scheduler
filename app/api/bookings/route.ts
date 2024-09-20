import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req:Request){
    try{
        const body = await req.json()

    const {name , email , note , status ,date , start , end, userId} = body

    const session = await getAuthSession()

    if(!session?.user){
        return {status: 401, message: 'Unauthorized'}
    }

    await db.bookings.create({
        data:{
            userId: userId,
            clientName: name,
            clientEmail: email,
            note: note,
            status: status,
            date: date,
            start: start,
            end: end

        }
    })


    
    return new Response("OK")
    }
    catch(error){
        return new Response("not able to book " , {
            status:401
        })
    }

    
}