"use client"

import { UsernameValidator } from "@/lib/validators/username";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


type FormData = z.infer<typeof UsernameValidator>


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

  const { mutate: updateUsername , isLoading} =
  useMutation({
    mutationFn :async ({ name} : FormData) =>{
      const payload: FormData = {name}

      const {data } = await axios.post("/api/username", payload)
      return data

    },
    onError:(err) =>{
      if (err instanceof AxiosError){
         if(err.response?.status === 409){
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another username.',
            variant: 'destructive',
          })
         }
      }
       
      return toast({
        title: 'Something went wrong.',
        description: 'Your username was not updated. Please try again.',
        variant: 'destructive',
      })
   


    }



  })
  
   

   
  


  
  return (
    <div> {` Welcome ${userName}`}</div>
  )
   




}
