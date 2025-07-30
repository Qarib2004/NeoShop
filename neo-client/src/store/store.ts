import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { cartSlice } from './cart/cart.slice';
import {FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,persistStore} from 'redux-persist'

const persistConfig = {
	key: 'neo-shop',
	storage,
	whiteList: ['cart']
}


const isClient = typeof window !== 'undefined'

const coombinedReducers = combineReducers({
    cart:cartSlice.reducer
})



let mainReducer = coombinedReducers




if(isClient){
    const {persistReducer} = require('redux-persist')
    const storage = require('redux-persist/lib/storage')

    mainReducer = persistReducer(persistConfig,coombinedReducers)
}


export const store =  configureStore({
    reducer:mainReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
})




export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>


















