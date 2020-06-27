import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userreducer';
import cartReducer from './cart/cartreducer';
import directoryReducer from './directory/directoryreducer';
import shopReducer from './shop/shopreducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer
});
export default persistReducer(persistConfig, rootReducer);