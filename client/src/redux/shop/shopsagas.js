import { takeLatest, call, all, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/FirebaseUtils';

import { 
	fetchCollectionsSuccess,
	fetchCollectionsFailure
} from './shopactions'

import ShopActionTypes from './shoptypes';

export function* fetchCollectionsAsync() {

     try {	
      	const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch(error){
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)]);
}