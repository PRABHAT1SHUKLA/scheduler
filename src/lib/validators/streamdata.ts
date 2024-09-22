import {z} from "zod"

const youtubeUrlRegex = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$|^https:\/\/(www\.)?youtu\.be\/[\w-]{11}$/;

const streamValidator = z.object({
    name: z.string().max(100).min(2),
    url : z.string().regex(youtubeUrlRegex),

})

export type  CreateStream =  z.infer<typeof streamValidator>