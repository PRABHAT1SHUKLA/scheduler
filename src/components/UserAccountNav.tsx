
import React from "react"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"
import Logout from "./LogOut"
import { User } from "next-auth"
import { Avatar , AvatarImage,AvatarFallback} from "./ui/avatar"
import Image from "next/image"

interface userAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {

  user: Pick<User,"image"|"email"|"name">
}

export function  UserAccontNav({user}: userAccountNavProps){
  return(
  <>
    <DropdownMenu>
      
      <DropdownMenuTrigger>
      <Avatar>
      <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={user.image}
                        alt='profile picture'
                        referrerPolicy='no-referrer' />
                </div>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        
        </DropdownMenuTrigger>
      <DropdownMenuContent>
     <DropdownMenuItem>helllo</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem>whatsup</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem><LogOut/><Logout/></DropdownMenuItem>
  
      </DropdownMenuContent>
      </DropdownMenu>
     

  
  </>
  )
}

