import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

interface UserState {
    user: IUser | null,
    isAuth: boolean
}

const initialState: UserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logOut: (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.isAuth = false
        }
    }
})

export const { setUser, logOut } = userSlice.actions

export default userSlice.reducer