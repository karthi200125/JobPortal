'use client';

import { User } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: User | null;
}

let userData: User | null = null;

if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    userData = storedUser ? JSON.parse(storedUser) : null;
}

const initialState: AuthState = {
    user: userData || null,
};

const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRedux(state, action: PayloadAction<any>) {
            state.user = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
        logoutRedux(state) {
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
    },
});

export const { loginRedux, logoutRedux } = AuthSlice.actions;

export default AuthSlice.reducer;
