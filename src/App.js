import React, { Component } from 'react';
import TodoApp from './components/TodoApp';
import './App.css';
import './css/box-shadow.css';
import './css/mobile.css';
import './css/landscape-mobile.css';
import './css/tablet.css';

class App extends Component {
  render() {
    return (
      <div className='h-100'>
      <TodoApp />
      </div>
    );
  }
}

export default App;
