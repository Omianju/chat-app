import z from "zod"





export const signUpSchema = z.object({
    email : z.string().email({message : "Enter valid email address"}),
    fullName : z.string(),
    password : z.string().min(3, {message : "Enter at least 3 characters"}),
    profilePic : z.string().optional()
})

export const loginSchema = z.object({
    email : z.string().email({message : "Enter valid email address"}),
    password : z.string().min(3, {message : "Enter at least 3 characters"})
})