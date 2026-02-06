import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../features/PostFeatures";
import LoadingScreen from "../components/LoadingScreen";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SlideShow from "../components/Slideshow";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);
  const { posts, isLoading, error } = useSelector((state: any) => state.post);
  return (
    <Fragment>
      <Helmet>
        <title>Magala</title>
      </Helmet>
      <SlideShow />
      <div className="container">
        {isLoading === true ? (
          <LoadingScreen />
        ) : (
          posts && (
            <div className="posts-container">
              {isLoading ? (
                <LoadingScreen />
              ) : error ? (
                (Swal.fire("Error", error, "error"), null)
              ) : (
                posts.map((post: any) => (
                  <Link to={`/posts/${post.slug}`}>
                    <Card
                      key={post._id}
                      _id={post._id}
                      title={post.title}
                      content={post.content}
                      category={post.category?.title}
                      image={post.image}
                      author={`${post.author?.firstName} ${post.author?.lastName}`}
                      authorImage={post.author?.image}
                      commentsCount={post.commentsCount}
                      date={new Date(post.createdAt).toLocaleDateString()}
                    />
                  </Link>
                ))
              )}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default Home;
