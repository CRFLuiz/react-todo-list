import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from '../components/App';

const store = configureStore();

ReactDOM.render(
  React.createElement(Provider, { store: store }, App),
  document.getElementById('app')
);