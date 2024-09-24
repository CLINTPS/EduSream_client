import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  getUserData,
  googleSignup,
  becomeInstructor,
  getAllCourses,
  getCourseById,
  fetchEnrolledCourses
} from "../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    course: [],
    courseDetail:null,
    enrolledCourses:[]
  },
  reducers: {
    updateUserOnOTPValidation: (state, { payload }) => {
      state.user = payload;
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    // console.log("Reached action,reducer,userAuth");
    builder
      .addCase(signup.fulfilled, (state, { payload }) => {
        // console.log("User signup payload",payload);

        (state.loading = false),
          (state.error = null),
          (state.user = payload.data);
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.user = null);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        (state.loading = false), (state.error = null), (state.user = payload);
      })
      .addCase(login.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.user = null);
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        (state.loading = false),
          (state.error = null),
          (state.user = payload.data);
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.user = null);
      })
      .addCase(googleSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignup.fulfilled, (state, { payload }) => {
        (state.loading = false),
        (state.error = null),
        (state.user = payload.data);
      })
      .addCase(googleSignup.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.user = null);
      })
      .addCase(becomeInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(becomeInstructor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = { ...state.user, role: payload.role };
      })
      .addCase(becomeInstructor.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, { payload }) => {
        (state.loading = false),
        (state.error = null),
        (state.course = payload.data.allData);
      })
      .addCase(getAllCourses.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload), (state.course = null);
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
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, { payload }) => {
        console.log("fbdsyfbdsfuo0",payload);
        state.loading = false;
        state.error = null;
        state.enrolledCourses = payload.data;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.enrolledCourses = null;
      });
  },
});

export const { updateUserOnOTPValidation, updateError } = userSlice.actions;
export default userSlice.reducer;
