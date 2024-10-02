import { useSession } from "next-auth/react";
import { useState } from "react";

export async function dashboard(){

  const [ userName , setuserName] =  useState("")
  
   const { data : session  , status} = useSession()

   if(status === "loading"){
    return <p> Loading...</p>
   }
  
   if(!session){
    return <p> You are not logged in</p>
   }

   
   const { user } = session

   const name = user?.username

   
  if(name){
    setuserName(name)
  }


  
  return (
    <div> {` Welcome ${userName}`}</div>
  )
   




}