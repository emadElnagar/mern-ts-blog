import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../../../features/PostFeatures";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);
  const { posts } = useSelector((state: any) => state.post);
  return (
    <div className="container">
      <h1 className="heading text-center">all posts</h1>
      {posts.map((post: { _id: Key; title: string; slug: string }) => (
        <ul key={post._id}>
          <li className="row">
            <span>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </span>
            <div className="control">
              <button>
                <IoPencil /> update
              </button>
              <button className="delete">
                <MdDelete /> delete
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default AllPosts;
