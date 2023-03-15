import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  newMessages?: object;
  status?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  newMessages: { type: Object, default: {} },
  status: { type: String, default: 'online' }
});

const User = model<IUser>('User', userSchema);

export default User;