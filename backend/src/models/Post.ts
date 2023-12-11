import { Schema, model } from 'mongoose';

interface Post {
  title: string;
  description: string;
  image: string;
  likes: object[];
  likesCount: number;
  comments: string[];
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: [Schema.Types.ObjectId], ref: 'User' },
  likesCount: Number,
  comments: [String]
}, {
  timestamps: true
});

const Post = model("Post", postSchema);
export default Post;
