import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/adminAction";

const adminSlice = createSlice({
  name: 'admin',
    initialState: {
        loading: false,
        students: [],
        instructors: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.students = payload.students;
                state.instructors = payload.instructors;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default adminSlice.reducer;
