import z from "zod"


export const signUpSchema  = z.object({
    fullName : z.string().min(3, {message : "Full Name required at least 3 characters."}).trim(),
    email : z.string().email({message : "Enter a valid email"}).trim(),
    password : z.string().min(6, {message :"Password required at least 6 characters."}).trim()
})

export const loginSchema = z.object({
    email : z.string().email({message : "Enter valid Email"}),
    password : z.string().min(1, {message : "Password field is empty"})
})