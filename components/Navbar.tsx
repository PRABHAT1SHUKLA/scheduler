import {  getAuthSession } from "@/lib/auth"
import { Music } from "lucide-react"
import Link from "next/link"

const Navbar = async() =>{
    const session = await getAuthSession()

    return(
        <div className=" bg-gradient-to-r from-stone-700 to-zinc-700  inset-x-0 py-4 fixed top-0">
            <div className="max-w-7xl flex justify-between mx-auto  items-center">
                <Link href='/' className="flex gap-2 text-white text-4xl">
                 <Music/>
                  Muse
                 </Link>
                
                {session? <div>SignOut</div>: <Link href="/sign-in" className="text-3xl text-white">SignIn</Link>}


               
            </div>
        </div>
    )
}

export default Navbar