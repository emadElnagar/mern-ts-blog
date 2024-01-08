import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRouter from './routes/postRoutes';
import categoryRouter from './routes/categoryRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/blog');

app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);

app.listen(port);
