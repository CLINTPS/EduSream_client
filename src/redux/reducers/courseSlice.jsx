import { createSlice } from "@reduxjs/toolkit";
import { fetchInstructorCourses,getAllCourses,getCourseById } from "../actions/courseAction";


const courseSlice = createSlice({
  name: 'course',
  initialState: {
    allCourse: [],
    courseDetail:null,
    instuctoreCourses: [],
    loading: false,
    error: null,
    totalCourses: 0,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.instuctoreCourses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, { payload }) => {
        (state.loading = false),
        (state.error = null),
        (state.allCourse = payload.data.allData);
      })
      .addCase(getAllCourses.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.allCourse = null);
      })


      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, { payload }) => {
        console.log("fbdsyfbdsfuo0",payload);
        state.loading = false;
        state.error = null;
        state.courseDetail = payload.data;
        state.isEnrolled = payload.isEnrolled;
      })
      .addCase(getCourseById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.courseDetail = null;
      })
  },
});

export default courseSlice.reducer;