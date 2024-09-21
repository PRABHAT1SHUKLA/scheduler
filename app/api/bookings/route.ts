import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req:Request){
    try{
        const body = await req.json()

    const {name , email , note , status ,date , start , end , adminEmail} = body

    const session = await getAuthSession()

    if(!session?.user){
        return new Response(
           "unaithorized"
        )
    }


    console.log("hello")
    const admin = await db.user.findUnique({
        where: {
            email :  adminEmail,
        }
    })

    console.log(admin?.id)

    const id = JSON.stringify(admin?.id)

    console.log(id)
    await db.bookings.create({
        data:{
            userId: admin?.id, 
            clientName: name,
            clientEmail: email,
            note: note,
            status: status,
            date: new Date(date),
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