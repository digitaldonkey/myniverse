import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  createMigrate
} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { rootReducer } from './app/store';
import reportWebVitals from './reportWebVitals';
import App from './App.jsx'

const migrations = {
  0: (state) => {
    state.myniverse.config.ui = {
      activeTab: 0
    }
    return state;
  }
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage('myniverse'),
  migrate: createMigrate(migrations)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




