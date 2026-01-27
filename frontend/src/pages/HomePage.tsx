import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../features/PostFeatures";
import LoadingScreen from "../components/LoadingScreen";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);
  const { posts, isLoading } = useSelector((state: any) => state.post);
  return (
    <Fragment>
      <Helmet>
        <title>Magala</title>
      </Helmet>
      <div className="container">
        {isLoading === true ? (
          <LoadingScreen />
        ) : (
          posts && (
            <div className="posts-container">
              {posts.map((post: any) => (
                <Link to={`/posts/${post.slug}`}>
                  <Card
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    category={post.category.title}
                    image={post.image}
                  />
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default Home;
