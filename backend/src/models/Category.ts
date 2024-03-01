import { Schema, model } from 'mongoose';

interface Category {
  title: string;
  author: object;
}

const CategorySchema = new Schema<Category>({
  title: { type: String, required: true },
  author: { type: [Schema.Types.ObjectId], required: true, ref: 'User' }
}, {
  timestamps: true
});

const Category = model('Category', CategorySchema);
export default Category;
