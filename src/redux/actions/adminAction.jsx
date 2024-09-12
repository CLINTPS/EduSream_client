import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../common/api";
import axios from "axios";
import { config } from "../../common/configurations";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth/getAllUser`, config);
      const allUsers = data.data.allData;
      const students = allUsers.filter((user) => user.role === "student");
      const instructors = allUsers.filter((user) => user.role === "instructor");
      const instructorsPending = allUsers.filter(
        (user) => user.role === "pending"
      );

      return { students, instructors, instructorsPending };
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const fetchInstructorById = createAsyncThunk(
  "admin/fetchInstructorById",
  async (id, { rejectWithValue }) => {
    console.log("reached fetchInstructorById");
    try {
      const response = await axios.get(`${URL}/auth/instructors/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptInstructor = createAsyncThunk(
  "admin/acceptInstructor",
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/acceptInstructor`, {
        id,
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectInstructor = createAsyncThunk(
  'admin/rejectInstructor',
  async ({ email, reasons }, { rejectWithValue }) => {
    console.log("instracture reject request....",email,reasons);
    try {
      const response = await axios.post(`${URL}/auth/reject-instructor`, { email,reasons });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPendingCourses = createAsyncThunk(
  "admin/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetchPendingCourses reached");
      
      const { data } = await axios.get(`${URL}/course/getPendingCourses`, config);
      console.log("getPendingCourses",data);      
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const approveCourse = createAsyncThunk(
  "admin/approveCourse",
  async ({id}, { rejectWithValue }) => {
    try {
      console.log("approveCourse reached id:",id);
      const response = await axios.post(`${URL}/course/approveCourse`, {
        id,
      },config);
      console.log("approveCourse data",response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectCourse = createAsyncThunk(
  "admin/rejectCourse",
  async ({id,reason }, { rejectWithValue }) => {
    try {
      console.log("rejectCourse reached id:",id,reason );
      const response = await axios.post(`${URL}/course/rejectCourse`, {
        id,
        reason 
      },config);
      console.log("rejectCourse data",response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const blockUnblockUser= createAsyncThunk('admin/blockUnblockUser', async ({userId, isBlocked},{rejectWithValue}) => {
//     try {
//         const { data } = await axios.post(`${URL}/auth/blockUnblockUser`,{ userId, isBlocked },config);
//         console.log("blockUnblockUser"),data;
//         return { userId, isBlocked: !isBlocked};
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })
