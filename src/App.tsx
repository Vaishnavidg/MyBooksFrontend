import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookForm from './components/BookForm';
import ShowBook from './components/ShowBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
// import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <HomePage/>
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/create' element={<BookForm />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes> */}
    </div>

  );
}

export default App;
