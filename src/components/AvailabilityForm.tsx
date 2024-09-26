import { availabilitySchema } from "@/lib/validators/availability"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

const days =[
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday" 
]

interface availabilityProps{
    
  initialData : {}

}

type FormData = z.infer<typeof  availabilitySchema>;


export default function AvailabilityForm({initialData}:availabilityProps){

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState:{errors},

  } = useForm<FormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {...initialData},
  })

  const  {mutate : UpdateAvailability , isLoading} =
   useMutation({
     mutationFn : async() =>{

     }
   })

   return(
    
   )

}