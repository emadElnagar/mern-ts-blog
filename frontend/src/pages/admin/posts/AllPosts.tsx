import { Fragment, Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, GetAllPosts } from "../../../features/PostFeatures";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);
  const { posts } = useSelector((state: any) => state.post);
  // Delete post
  const handleDelete = (id: Key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeletePost(id));
        dispatch(GetAllPosts());
        Swal.fire({
          title: "Deleted!",
          text: "Post has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <Fragment>
      <Helmet>
        <title>Magala-posts-all</title>
      </Helmet>
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
                  <Link to={`/admin/posts/${post.slug}/update`}>
                    <IoPencil /> update
                  </Link>
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(post._id)}
                >
                  <MdDelete /> delete
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </Fragment>
  );
};

export default AllPosts;
