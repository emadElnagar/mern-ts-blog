import { Schema, model } from 'mongoose';

interface Category {
  title: string;
  author: object;
}

const CategorySchema = new Schema<Category>({
  title: String,
  author: { type: [Schema.Types.ObjectId], ref: 'User' }
}, {
  timestamps: true
});

const Category = model('Category', CategorySchema);
export default Category;
