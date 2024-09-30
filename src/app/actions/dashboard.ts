"use server"

import { getAuthSession } from "@/lib/auth"

export async function getLatestUpdates(){
  const session  = await getAuthSession()

  if(!session || !session?.user?.id){
     throw new Error("Unauthorized to see this page");
  }

  const user = await db.user.findUnique({
    
  })
}