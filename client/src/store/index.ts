import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import fileSlice from "./reducers/fileSlice";
import uploadSlice from "./reducers/uploadSlice";
import appSlice from "./reducers/appSlice";




export const store = configureStore({
    reducer: {
        user: userSlice,
        file: fileSlice,
        upload: uploadSlice,
        app: appSlice
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch