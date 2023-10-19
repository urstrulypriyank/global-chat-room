import Chat from "../../models/chatModel";
import { connect } from "../../dbConfig/dbconfig";
import { NextResponse } from "next/server";
connect();
export default async function handler(req, res) {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });


    res.status(200).json({ message: messages });
    res.send();
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
