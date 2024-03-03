import { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/users/Login';
import RegisterPage from './pages/users/Register';
import NavBar from './components/NavBar';
import NewPostPage from './pages/posts/NewPost';
import NotFoundPage from './pages/NotFound';
import { useSelector } from 'react-redux';
import Categories from './pages/categories/Categories';
import Dashboard from './pages/admin';

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
        <Route path='/' element={<Home />} />
        <Route path='/users/login' element={<LoginPage />} />
        <Route path='/users/register' element={<RegisterPage />} />
        {
          user !== null && user.role !== 'user' &&
          <Fragment>
            <Route path='/posts/new' element={<NewPostPage />} />
            <Route path='/categories/new' element={<Categories />} />
          </Fragment>
        }
        {
          user !== null && user.role === 'admin' &&
          <Fragment>
            <Route path='/admin' element={<Dashboard />} />
          </Fragment>
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
