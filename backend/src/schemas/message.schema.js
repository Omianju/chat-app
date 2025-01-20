import z from "zod"


export const sendMessageSchema = z.object({
    text : z.string().optional(),
    image : z.string().optional()
})