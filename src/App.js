import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN } from './actions/user';
import AppRouter from './appRouter';
import './style/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
