import { model, Schema } from "mongoose";

export const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Message", MessageSchema);
