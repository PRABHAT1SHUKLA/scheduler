"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboardpage(){

  const [ userName , setUserName] =  useState("")
  
   const { data : session  , status} = useSession()

   if(!session){
    return <p> You are not logged in</p>
   }

   if(status === "loading"){
    return <p> Loading...</p>
   }

   useEffect(() => {
    if (session?.user?.username) {
      setUserName(session.user.username);
    }
  }, [session]);

  
  
   

   
  


  
  return (
    <div> {` Welcome ${userName}`}</div>
  )
   




}
