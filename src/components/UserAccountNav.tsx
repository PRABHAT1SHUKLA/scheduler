
import React from "react"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"
import Logout from "./LogOut"
import { User } from "next-auth"

interface userAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {

  user: Pick<User,"image"|"email"|"name">
}

export function  UserAccontNav({user}: userAccountNavProps){
  return(
  <>
    <DropdownMenu>
      
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
     <DropdownMenuItem>helllo</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem>whtsup</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem><LogOut/><Logout/></DropdownMenuItem>
  
      </DropdownMenuContent>
      </DropdownMenu>
     

  
  </>
  )
}

