import mongoose, { mongo } from "mongoose";
const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
  },
  message: {
    type: String,
    required: [true, "Please Provide message"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
