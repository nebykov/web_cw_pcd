import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUploadFile } from "../../types/types";


interface uploadState {
    isVisble: boolean,
    files: IUploadFile[]
}

const initialState: uploadState = {
    isVisble: false,
    files: []
}

export const uploadSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        showUploader: (state) => {
            state.isVisble = true
        },
        hideUploader: (state) => {
            state.isVisble = false
        },
        addUploadFile: (state, action: PayloadAction<IUploadFile>) => {
            state.files.push(action.payload)
        },
        removeUploadFile: (state, action: PayloadAction<IUploadFile>) => {
            state.files = state.files.filter((file) => file.id !== action.payload.id)
        },
         clearUploader: (state) => {
            state.files = []
         },
        changeUploadFile: (state, action: PayloadAction<IUploadFile>) => {
            state.files = state.files.map((file) =>
            file.id === action.payload.id ? { ...file, progress: action.payload.progress } : file
          );
        }
    }
})

export const { showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile, clearUploader } = uploadSlice.actions

export default uploadSlice.reducer