import React from 'react'
import { store } from './store'
import Header from './components/header'
import Footer from './components/footer'
import './App.css'
import InputItem from './components/inputItem'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className={'app'}>
        <Header />
        <InputItem />
        <Footer />
      </div>
    </Provider>
  )
}

export default App
