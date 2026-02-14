export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  likes: string[];
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  replies?: Comment[];
}
