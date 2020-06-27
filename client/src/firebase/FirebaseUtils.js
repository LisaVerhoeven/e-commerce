import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
 	apiKey: "AIzaSyAKgJcr3PrpWn8BOJ-xR1w5NqZg5qAfqrU",
    authDomain: "ecommerce-30ec0.firebaseapp.com",
    databaseURL: "https://ecommerce-30ec0.firebaseio.com",
    projectId: "ecommerce-30ec0",
    storageBucket: "ecommerce-30ec0.appspot.com",
    messagingSenderId: "570779796009",
    appId: "1:570779796009:web:5784a2bbb0baac8db5d238",
    measurementId: "G-GJC8C143SR"
 };

 firebase.initializeApp(config);

 export const createUserProfileDocument = async (userAuth, additionalData) => {
 	if(!userAuth) return;

 	const userRef = firestore.doc(`/users/${userAuth.uid}`);

 	const snapShot = await userRef.get();

 	if(!snapShot.exists) {
 		const {displayName, email} = userAuth;
 		const createdAt = new Date();

 		try {
 			await userRef.set({
 				displayName,
 				email,
 				createdAt,
 				...additionalData
 			})
 		} catch(error) {
 			console.log('error creating user', error.message);
 		}
 	}

 	return userRef;
 }

 export const getUserCartRef = async (user, cart) => {
 	const cartsRef = firestore.collection('carts').where('userId', '==', user.id);
 	
 	const snapShot = await cartsRef.get();
 	if (snapShot.empty){
 	const userId = user.id;
 		try {
 			const cartDocRef = firestore.collection('carts').doc();
 			await cartDocRef.set({
 				userId, cart
 			})
 			return cartDocRef;
 		} catch(error) {
 			console.log('error setting up cart', error.message);
 		}

 	}

 	return snapShot.docs[0].ref;
 }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};



 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 export const googleProvider = new firebase.auth.GoogleAuthProvider();
 googleProvider.setCustomParameters({prompt: 'select_account'});
 export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

 export default firebase;