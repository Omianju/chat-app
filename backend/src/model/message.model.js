import mongoose from "mongoose"



const messageSchema  = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : String,
    image : String
}, {
    timestamps : true
})


// "Message" => "messages"
export const messageModel = mongoose.model("Message", messageSchema)