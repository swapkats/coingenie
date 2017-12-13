import React, { Component } from 'react';
import store from './store';
import { Provider, connect } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundary showError={true}>
        <Provider store={store}>
          <Main />
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
