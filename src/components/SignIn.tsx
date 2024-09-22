"use client"

import { signIn } from "next-auth/react"


 
export default function SignIn() {

 const login = async() =>{
     try{
      await signIn("google")
     }
     catch(error){
      console.error(error)
     }
 }
    


  return (
    
    
      <button type="submit" onClick={login}>Signin with Google</button>
    
  )
} 