import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }
    //prepare chat data to be saved in the db
    const chatData = { userId, messeges: [], name: "New Chat" };

    //connect to db and create a chat in the db
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({ success: true, message: "Chat created" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
