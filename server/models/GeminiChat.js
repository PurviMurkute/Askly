import { model, Schema } from "mongoose";

const userChats = new Schema(
  {
    query: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Chats = model("userChats", userChats);

export default Chats;