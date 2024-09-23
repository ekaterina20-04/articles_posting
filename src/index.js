import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import CreateArticle from './components/CreateArticle/CreateArticle';
import MyArticle from './components/MyArticle/MyArticle';
import Article from './components/Article/Article';

import './index.css';
import Items from './components/Items/Items';

const BASE_URL = 'https://vertically-capable-tick.ngrok-free.app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Items />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/create_article' element={<CreateArticle />} />
        <Route path='/article/:id' element={<Article />} />
        <Route path='/my_article' element={<MyArticle/>}/>
      </Routes>
    </BrowserRouter>
);

