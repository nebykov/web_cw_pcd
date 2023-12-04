import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../types/types";


interface FileState {
    files: IFile[] | null,
    currentDir: string,
    folderName: string | null,
    stack: any[]
}

const initialState: FileState = {
    files: [],
    currentDir: '',
    folderName: null,
    stack: []
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<IFile[]>) => {
            state.files = action.payload
        },
         addFile: (state, action: PayloadAction<IFile>) => {
              state.files?.push(action.payload)
         },
        setCurrentDir: (state, action: PayloadAction<string>) => {
            state.currentDir = action.payload
            console.log(state.currentDir)
        },
        setFolderName: (state, action: PayloadAction<string>) => {
             state.folderName = action.payload
        },
        pushToStack: (state, action: PayloadAction<string>) => {
              state.stack.push(action.payload)
        },
        popFromStack: (state) => {
             state.stack.pop()
        },
        deleteFileAction: (state, action: PayloadAction<string>) => {
            if (state.files) {
                state.files = state.files?.filter(file => file.id !== action.payload)
            }
        }
    }
})

export const { setFiles, setCurrentDir, setFolderName, addFile, pushToStack, popFromStack, deleteFileAction } = fileSlice.actions

export default fileSlice.reducer