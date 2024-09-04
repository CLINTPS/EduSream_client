import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchInstructorById } from "../actions/adminAction";

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    students: [],
    instructors: [],
    instructorsPending: [],
    selectedInstructor: null,
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
        state.instructorsPending = payload.instructorsPending;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchInstructorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstructorById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedInstructor = payload;
        state.error = null;
      })
      .addCase(fetchInstructorById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default adminSlice.reducer;
