import { Schema, model } from 'mongoose';

interface Comment {
  post: object;
  author: object;
  body: string;
  replies: [
    {
      author: object,
      createdAt: Date,
      body: string
    }
  ]
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  replies: [
    {
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: new Date().getTime(),
      body: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
});

const Comment = model("Comment", commentSchema);
export default Comment;
