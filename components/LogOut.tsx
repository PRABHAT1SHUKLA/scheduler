"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"




const Logout = () => {
    return(
        <Button variant="ghost" onClick={(event) => {
            event.preventDefault()
            signOut({
                callbackUrl:`${window.location.origin}/sign-in`
            })
        }}>LogOut</Button>

    )

}

export default Logout