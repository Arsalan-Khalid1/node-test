import { Schema, model } from 'mongoose';

interface IMessage {
  content: string;
  from: object;
  socketId: string;
  time: string;
  date: Date;
  to: string;
}

const messageSchema = new Schema<IMessage>({
  content: { type: String },
  from: { type: Object },
  date: { type: Date },
  socketId: { type: String },
  time: { type: String },
  to: { type: String },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;