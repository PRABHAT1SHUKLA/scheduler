"use client"
import { Button } from "@/src/components/ui/button"
import {set, SubmitHandler, useForm} from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const FormObject = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type FormFields = z.infer<typeof FormObject>

export default function Create(){
    
   const { register , handleSubmit , setError, formState: {errors,isSubmitting}} = useForm <FormFields>({
    defaultValues:{
        email:"test@gmail.com"
    },
    resolver: zodResolver(FormObject)
   })

   const onSubmit: SubmitHandler<FormFields> = async(data) =>{
    try{
        await new Promise((resolve) => setTimeout( resolve , 2000));
        throw new Error()
        console.log(data);
    }catch(error){
        setError("root",{
            message:"email is already taken"
    })
    }}

    return (
        <div className="flex flex-col justify-between items-center divide-y divide-red-400">
            
            <div className="text-3xl font-bold text-cyan-500"> Create a Stream</div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 border-s-violet-600">
                <input {...register("email")} type="text" placeholder="email"/>

                {errors.email && <div className="text-red-600">{errors.email.message}</div>} 

                <input {...register("password")} type='text' placeholder="password"/>

                {errors.password && <div className="text-red-600">{errors.password.message}</div>}

                <div className="flex gap-x-4 items-center">

                <Button variant={"outline"} disabled={isSubmitting} type="submit"> 
              {  isSubmitting? "Loading..." : "Submit"}        
            
                    </Button>
                <Button variant={"outline"} type="reset"> Reset</Button>



                </div>
                {errors.root && <div className="text-red-600">{errors.root.message}</div>}
               
            </form>
          
  
         </div>
    )
}