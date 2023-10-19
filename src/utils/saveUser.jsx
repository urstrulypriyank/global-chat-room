import Chat from "../models/chatModel";
export default async function saveUser({ name, email, message }) {
  try {
    const chat = new Chat({ name, email, message });
    chat.message = message;
    await chat.save();
    console.log("chat saved to database");
  } catch (error) {
    console.log("Error saving message:", error.message);
  }
}
