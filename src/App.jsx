import React, { useState } from 'react';
import Header from './components/Header/Header';
import Items from './components/Items/Items';


const App = () => {


  return (
    <div className='wrapper'>
      <Header />
      <Items /> 
    </div>
  );
};

export default App;


