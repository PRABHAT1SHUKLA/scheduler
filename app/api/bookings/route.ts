import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req:Request){
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
            client
        }
    })


    
    

    
}