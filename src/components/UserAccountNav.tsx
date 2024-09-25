
import React from "react"
import { DropdownMenu,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"
import Logout from "./LogOut"

interface userAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {

  user: Pick<User,"image"|"email"|"name">
}

export function  UserAccontNav ({user}: userAccountNavProps){
  return(<>
    <DropdownMenu>
     <DropdownMenuTrigger>Open</DropdownMenuTrigger>
     <DropdownMenuItem>helllo</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem>whtsup</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem><LogOut/><Logout/></DropdownMenuItem>
    </DropdownMenu>

  
  </>)
}

