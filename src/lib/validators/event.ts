import { z } from "zod";

export const eventSchema = z.object({
   
   title : z.string().min(1, "title necessry").max(50,"title length must be less than 50"),
   description: z.string().min(1,"description required").max(100,"description length not more than 100 words"),
   duration:z.number().int().positive("negative number doesn't makes sense"),
   isPrivate: z.boolean()


})