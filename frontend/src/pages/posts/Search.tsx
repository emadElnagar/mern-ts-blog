import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SearchPost } from "../../features/PostFeatures";
import { AppDispatch } from "../../store";
import LoadingScreen from "../../components/LoadingScreen";
import Card from "../../components/Card";
import Swal from "sweetalert2";

const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, searchResults } = useSelector(
    (state: any) => state.post,
  );
  useEffect(() => {
    if (!query) return;
    dispatch(SearchPost(query));
  }, [dispatch, query]);
  return (
    <Fragment>
      <Helmet>
        <title>{searchResults ? `Magala-${query}` : "Magala"}</title>
      </Helmet>
      <div className="container">
        <div className="posts-container">
          {isLoading ? (
            <LoadingScreen />
          ) : error ? (
            (Swal.fire("Error", error, "error"), null)
          ) : (
            searchResults &&
            searchResults.map((post: any) => (
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
      </div>
    </Fragment>
  );
};

export default SearchPage;
