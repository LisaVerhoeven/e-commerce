import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import UserActionTypes from '../user/usertypes';
import CartActionTypes from './carttypes';
import { clearCart, cartFromFirebase } from './cartactions';
import { selectCurrentUser } from '../user/userselectors';
import { selectCartItems } from './cartselectors';

import {
  getUserCartRef
} from '../../firebase/FirebaseUtils';


export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateFirebaseCart() {
const currentUser = yield select(selectCurrentUser);
if(currentUser) {
	 try {
	 	const cartDocRef = yield call(getUserCartRef, currentUser);
	 	const cart = yield select(selectCartItems);
	 	yield cartDocRef.update({cart});
	} catch(error) {
		console.log(error);
	}
}
}

export function* getCartFromFirebase({payload: user}) {
	try {
		const cart = yield select(selectCartItems);

		const cartDocRef = yield call(getUserCartRef, user, cart);
		const cartSnapshot = yield cartDocRef.get();
		yield put(cartFromFirebase(cartSnapshot.data().cart));
	} catch (error) {
		console.log(error);
	}
	
}



export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
	yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartFromFirebase);
}

export function* onCartChange() {
	yield takeLatest([
		CartActionTypes.ADD_ITEM, 
		CartActionTypes.REMOVE_ITEM, 
		CartActionTypes.CLEAR_ITEM_FROM_CART, 
		CartActionTypes.CLEAR_CART], 
		updateFirebaseCart);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}