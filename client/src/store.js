import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'  // defaults to local storage for web
import rootReducer from './reducers';

const initialState = {}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk]

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export  {store, persistor}