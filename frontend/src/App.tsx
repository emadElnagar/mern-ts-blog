import { Fragment, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import NavBar from "./components/NavBar";
import NewPostPage from "./pages/posts/NewPost";
import NotFoundPage from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/admin";
import CategoryNew from "./pages/admin/categories/NewCategory";
import AllCategories from "./pages/admin/categories/AllCategories";
import UsersList from "./pages/admin/users/UsersList";
import UserProfile from "./pages/users/Profile";
import SinglePost from "./pages/posts/SinglePost";
import AllPosts from "./pages/admin/posts/AllPosts";
import UpdatePostPage from "./pages/admin/posts/UpdatePost";
import LoadingScreen from "./components/LoadingScreen";
import { changeTheme } from "./features/ThemeFeatures";
import SearchPage from "./pages/posts/Search";
import ScrollToTop from "./components/ScrollToTop";

const HoemScreen = lazy(() => import("./pages/HomePage"));

function App() {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    dispatch(changeTheme(savedTheme));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <HoemScreen />
            </Suspense>
          }
        />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/profile/:id" element={<UserProfile />} />
        <Route path="/posts/:slug" element={<SinglePost />} />
        <Route path="/search/:query" element={<SearchPage />} />
        {user && user.role !== "user" && (
          <Fragment>
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/categories/new" element={<Categories />} />
          </Fragment>
        )}
        {user && user.role === "admin" && (
          <Fragment>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/categories" element={<AllCategories />} />
            <Route path="/admin/categories/new" element={<CategoryNew />} />
            <Route path="/admin/posts" element={<AllPosts />} />
            <Route path="/admin/posts/new" element={<NewPostPage />} />
            <Route
              path="/admin/posts/:slug/update"
              element={<UpdatePostPage />}
            />
            <Route path="/admin/users" element={<UsersList />} />
          </Fragment>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
