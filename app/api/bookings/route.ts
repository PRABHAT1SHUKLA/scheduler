import { getAuthSession } from "@/lib/auth"

export async function POST(req:Request){
    const body = await req.json()

    const {name , email , note , status ,date , start , end } = body

    const session = await getAuthSession()

    if(!session?.user){
        return {status: 401, message: 'Unauthorized'}
    }
}