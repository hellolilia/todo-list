import React from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import InputItem from "./components/inputItem";
import './App.css'

function App() {
  return (
    <div className={'app'}>
      <Header/>
      <InputItem />
      <Footer/>
    </div>
  );
}

export default App;
