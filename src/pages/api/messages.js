import Chat from "../../models/chatModel";
import { connect } from "../../dbConfig/dbconfig";
connect();
export default async function GET(req, res) {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
