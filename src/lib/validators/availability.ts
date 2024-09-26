import { z } from "zod";

export const daySchema = z.object({
  isAvailable: z.boolean(),
  startTime:z.string().optional(),
  endTime:z.string().optional(),

})
.refine(
  (data) =>{
    if(data.isAvailable && data.startTime&& data.endTime){
      return data.startTime<data.endTime
    }
    return true;
  },
  {
    message: "end time will be greater than startTime",
    path:["endTime"]
  }
)

export const availabilitySchema = z.object({
  monday:daySchema,
  tuesday:daySchema,
  wednesday:daySchema,
  thursday:daySchema,
  friday:daySchema,
  saturday:daySchema,
  sunday:daySchema
})