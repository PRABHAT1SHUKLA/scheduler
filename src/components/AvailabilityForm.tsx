import { availabilitySchema } from "@/lib/validators/availability"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Checkbox } from "./ui/checkbox"
import axios from "axios"

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

interface availabilityProps {

  initialData: {} || null

}

type FormData = z.infer<typeof availabilitySchema>;


export default function AvailabilityForm({ initialData }: availabilityProps) {

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },

  } = useForm<FormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  })

  const onSubmit = async ({ data }: FormData) => {

    setTimeout(() => {
      console.log(data)
    }, 3000)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) =>{
         <div key={day} className="flex items-center space-x-4 mb-4">
          <Controller 
            name={`${day}.isAvailable`} />
         </div>


        return()
      })
      
      
      }
    </form>
  )


}