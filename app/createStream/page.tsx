"use client"
import { useState } from "react"

export default function Create(){
    
     const [url , setUrl] = useState("")
     const [email , setEmail] = useState("")
     const [password , setPassword] = useState("")
     const [errors, setErrors] = useState<{email:string , password:string}>({
        email:"",
        password:""
     })
     
    function handleSubmit(e:React.FormEvent){
        e.preventDefault()

        setErrors({email:"" , password:""})

        if(!email.startsWith("@")){
            setErrors(prevErrors=>({...prevErrors , email:"Invalid email"}))
            return
        }

        if(password.length<4){
            setErrors(prevErrors=>({...prevErrors , password:"Password must be at least 4 characters"}))

         return

        }


        console.log("form submitted")

    }


    return (
        <div className="flex flex-col justify-between items-center divide-y divide-red-400">
            
            <div className="text-3xl font-bold text-cyan-500"> Create a Stream</div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 divide-y divide-red-950">
                <input
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  className=" border-blue-950"/>

                  {errors.email && <div className="text-red-600">errors.email</div>}

                  <input
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="text"
                  className="max-w-5xl border-blue-950"/>

                  {errors.password && <div className="text-red-600">errors.password</div>}

                  <button type="submit">Submit</button>
                
            </form>
  
         </div>
    )
}