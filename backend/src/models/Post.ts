import { Schema, model } from 'mongoose';

interface Post {
  title: string;
  slug: string;
  author: object,
  category: object;
  content: string;
  image: string;
  likes: object[];
  comments: string[];
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  content: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: [Schema.Types.ObjectId], ref: 'User' },
  comments: [String]
}, {
  timestamps: true
});

const Post = model("Post", postSchema);
export default Post;
