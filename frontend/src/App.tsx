import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/users/Login';
import RegisterPage from './pages/users/Register';
import NavBar from './components/NavBar';
import NewPostPage from './pages/posts/NewPost';
import NotFoundPage from './pages/NotFound';
import { useSelector } from 'react-redux';

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
          </Fragment>
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
