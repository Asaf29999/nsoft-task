import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

export const fetchUsers = async () => {
    // const response = await axios.get('/users');
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(response);
    return response.data;
};

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [1, 2, 3],
        loading: false,
        error: null,
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

export default usersSlice.reducer;