import z from "zod"


export const signUpSchema  = z.object({
    fullName : z.string().min(3, {message : "Full Name required at least 3 characters."}).trim(),
    email : z.string().email({message : "Enter a valid email"}).trim(),
    password : z.string().min(6, {message :"Password required at least 6 characters."}).trim()
})