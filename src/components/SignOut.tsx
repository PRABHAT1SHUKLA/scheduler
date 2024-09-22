
import { signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
 
export default function SignOut() {


    


  return (
    <form
      action={async () => {
        "use server"
        await signOut
      }}
    >
      <button type="submit">SignOut </button>
    </form>
  )
} 