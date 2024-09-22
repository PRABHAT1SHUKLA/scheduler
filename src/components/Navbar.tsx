

import { Music } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

import Logout from "./LogOut"
import { getAuthSession } from "../lib/auth"

const Navbar = async() =>{
    const session = await getAuthSession()

    

    return(
        <div className=" h-fitbg-zinc-400  inset-x-0 py-2 fixed top-0 border-b border-zinc-300">
            <div className="max-w-7xl flex justify-between mx-auto  items-center">
                <Link href='/' className="flex gap-2  text-2xl">
                 <Music/>
                  Muse
                 </Link>
                
                {session? <Logout/>: <Link href="/sign-in" className="text-2xl ">
                <Button variant="outline">SignIn</Button>
                </Link>}


               
            </div>
        </div>
    )
}

export default Navbar