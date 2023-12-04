import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SORT_BY, VIEW_MODE } from "../../types/types";


interface AppState {
    isCreateFolder: boolean,
    sortBy: SORT_BY | string,
    viewMode: VIEW_MODE
}

const initialState: AppState = {
    isCreateFolder: false,
    sortBy: SORT_BY.TYPE,
    viewMode: VIEW_MODE.LIST
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showCreateFolder: (state) => {
            state.isCreateFolder = true
        },
        hideCreateFolder: (state) => {
            state.isCreateFolder = false
        },
        setSortBy: (state, action: PayloadAction<SORT_BY | string>) => {
            state.sortBy = action.payload
        },
        setViewMode: (state, action: PayloadAction<VIEW_MODE>) => {
            state.viewMode = action.payload
        }
    }
})

export const { showCreateFolder, hideCreateFolder, setSortBy, setViewMode } = appSlice.actions

export default appSlice.reducer