import express from "express"
import http from "http"
import dotenv from "dotenv"
import  authRouter  from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"

const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

app.use("/api/auth", authRouter)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
    connectDB()
})