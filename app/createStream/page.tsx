"use client"
import { Button } from "@/components/ui/button"
import {SubmitHandler, useForm} from "react-hook-form"

type FormFields = {
    email: string,
    password: string
}

export default function Create(){
    
   const { register , handleSubmit} = useForm <FormFields>()

   const onSubmit: SubmitHandler<FormFields> = (data) =>{
    console.log(data)
   }

     
    


    return (
        <div className="flex flex-col justify-between items-center divide-y divide-red-400">
            
            <div className="text-3xl font-bold text-cyan-500"> Create a Stream</div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 border-s-violet-600">
                <input {...register("email")} type="text" placeholder="email"/>
                <input {...register("password")} type='text' placeholder="password"/>

                <div className="flex gap-x-4 items-center">

                <Button variant={"outline"} type="submit"> Submit</Button>
                <Button variant={"outline"} type="reset"> Reset</Button>

                </div>
               
            </form>
          
  
         </div>
    )
}