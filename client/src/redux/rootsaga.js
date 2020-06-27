import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shopsagas';
import { userSagas } from './user/usersagas.js';
import { cartSagas } from './cart/cartsagas';

export default function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}