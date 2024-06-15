import { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import NavBar from "./components/NavBar";
import NewPostPage from "./pages/posts/NewPost";
import NotFoundPage from "./pages/NotFound";
import { useSelector } from "react-redux";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/admin";
import CategoryNew from "./pages/admin/categories/NewCategory";
import AllCategories from "./pages/admin/categories/AllCategories";
import UsersList from "./pages/admin/users/UsersList";
import UserProfile from "./pages/users/Profile";
import SinglePost from "./pages/posts/SinglePost";
import AllPosts from "./pages/admin/posts/AllPosts";
import UpdatePostPage from "./pages/admin/posts/UpdatePost";

function App() {
  const { user } = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/profile/:id" element={<UserProfile />} />
        <Route path="/posts/:slug" element={<SinglePost />} />
        {user !== null && user.role !== "user" && (
          <Fragment>
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/categories/new" element={<Categories />} />
          </Fragment>
        )}
        {user !== null && user.role === "admin" && (
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
