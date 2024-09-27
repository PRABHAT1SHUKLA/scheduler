import { availabilitySchema } from "@/lib/validators/availability"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Checkbox } from "./ui/checkbox"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { timeSlots } from "@/lib/data"
import { Button } from "./ui/button"
import { Availability } from "@/types/availability"



interface availabilityProps {

  initialData: Availability

}

type FormData = z.infer<typeof availabilitySchema>;


export default function AvailabilityForm({ initialData }: availabilityProps) {

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors , isSubmitting},

  } = useForm<FormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  })

  const { mutate } = useMutation({

  })

  const onSubmit = async ({ data }: FormData) => {

    setTimeout(() => {
      console.log(data)
    }, 3000)

  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {["monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);

        return (
          <div key={day} className='flex items-center space-x-4 mb-4'>
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />

            <span className="w-24">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>

            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>


                    </Select>
                  )}
                />
                <span> to </span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>


                    </Select>
                  )}
                />

                {errors[day]?.endTime && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors[day].endTime.message}
                  </span>
                )}

              </>
            )}




          </div>
        )
      })


      }
      {/* {error && <div className="text-red-500 text-sm">{error?.message}</div>} */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Availability"}
      </Button>


    </form>




  )


}


