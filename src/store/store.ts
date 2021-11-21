import {configureStore, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {geoSearchAPI, LocationRespType} from "../dal/api";

export const initState = {
    geoList: [] as [] | LocationRespType[],
    searchText: '',
    serverError: false,
}

const geoListSlice = createSlice({
    name: 'geoList',
    initialState: initState,
    reducers: {
        setGeoList(state, action: PayloadAction<LocationRespType[]>) {
            state.geoList = action.payload
        },
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload
        },
        setServerError(state, action: PayloadAction<boolean>) {
            state.serverError = action.payload
        },
    },
})

export const {setGeoList, setSearchText, setServerError} = geoListSlice.actions
export const geoListReducer = geoListSlice.reducer

//thunk
export const getGeoList = () => (dispatch: Dispatch) => {
    const searchText = store.getState().geoList.searchText
        geoSearchAPI.getGeo(searchText).then(res => {
            if (res === 'error') {
                dispatch(setServerError(true))
            } else dispatch(setGeoList(res))
        });
}

//store
export const store = configureStore({
    reducer: {
        geoList: geoListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

//types
export type RootState = ReturnType<typeof store.getState>