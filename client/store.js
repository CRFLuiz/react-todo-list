import { createStore } from 'redux';
import reducer from './reducer';

// Factory so unit tests can construct isolated stores.
export default function configureStore() {
  return createStore(reducer);
}