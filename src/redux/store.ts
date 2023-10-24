import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {tableReducer} from "./slices/tableSlice";


let rootReducer = combineReducers({
    tableReducer,

});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']


const setupStore = () => configureStore({
    reducer: rootReducer
})

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
