"use client"
import { Button } from "@/components/ui/button"
import {SubmitHandler, useForm} from "react-hook-form"

type FormFields = {
    email: string,
    password: string
}

export default function Create(){
    
   const { register , handleSubmit , formState: {errors,isSubmitting}} = useForm <FormFields>()

   const onSubmit: SubmitHandler<FormFields> = async(data) =>{

    await new Promise((resolve) => setTimeout( resolve , 2000));
    console.log(data);
    
    
   }

     
    


    return (
        <div className="flex flex-col justify-between items-center divide-y divide-red-400">
            
            <div className="text-3xl font-bold text-cyan-500"> Create a Stream</div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 border-s-violet-600">
                <input {...register("email" ,{
                    required: "Email is required",
                    validate:(value) => {
                        if(!value.includes("@")){
                            return "Invalid email ,it must contain @"
                        }
                        return true;
                    },
                })} type="text" placeholder="email"/>

                {errors.email && <div className="text-red-600">{errors.email.message}</div>} 

                <input {...register("password",{
                    required:"Password is required",
                    minLength:{
                        value:8,
                        message:"Password must be at least 8 characters long"
                        
                    }
                })} type='text' placeholder="password"/>

                {errors.password && <div className="text-red-600">{errors.password.message}</div>}

                <div className="flex gap-x-4 items-center">

                <Button variant={"outline"} disabled={isSubmitting} type="submit"> 
              {  isSubmitting? "Loading..." : "Submit"}        
            
                    </Button>
                <Button variant={"outline"} type="reset"> Reset</Button>

                </div>
               
            </form>
          
  
         </div>
    )
}