import { Schema, model } from 'mongoose';

interface Comment {
  post: object;
  user: object;
  body: string;
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
}, {
  timestamps: true
});

const Comment = model("Comment", commentSchema);
export default Comment;
