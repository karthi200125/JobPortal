'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
}

let userData: any | null = null;

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
        userSavedJobs(state, action: PayloadAction<string>) {
            if (state.user) {
                const isSaved = state.user.savedJobs.includes(action.payload);
                if (isSaved) {
                    state.user.savedJobs = state.user.savedJobs.filter((id: any) => id !== action.payload);
                } else {
                    state.user.savedJobs = [...state.user.savedJobs, action.payload];
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(state.user));
                }
            }
        },
        userFollow(state, action: PayloadAction<string>) {
            if (state.user) {
                const isFollowing = state.user.followings.includes(action.payload);
                console.log('this is action payload', action.payload);
                console.log('this is isFollowing', isFollowing);
        
                if (isFollowing) {
                    state.user.followings = state.user.followings.filter((id: any) => id !== action.payload);
                } else {
                    state.user.followings = [...state.user.followings, action.payload];
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(state.user));
                }
            }
        }
        

    },
});

export const { loginRedux, logoutRedux, userSavedJobs, userFollow } = AuthSlice.actions;

export default AuthSlice.reducer;
