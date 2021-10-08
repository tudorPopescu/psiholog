import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './user/user.reducer';
import { componentsReducer } from './renderComponent/renderComponent.reducer';
import { googleReducer } from './google/google.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'google']
};

const rootReducer = combineReducers({
  user: userReducer,
  components: componentsReducer,
  google: googleReducer
});

export default persistReducer(persistConfig, rootReducer);
