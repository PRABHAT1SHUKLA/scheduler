import { getAuthSession } from "@/lib/auth"

export async function POST(req: Request){
    const body = await req.json()

    const { duration } = body

    const session = await getAuthSession()

    if(!session?.user){
        return new Response("User not Authorized", { status: 401 })
    }

    

}