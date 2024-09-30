import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../common/api";
import axios from "axios";
import { appJson, config } from "../../common/configurations";

export const getAllCourses = createAsyncThunk(
    "user/getAllCourses",
    async (_, { rejectWithValue }) => {
      try {
        // console.log("Reached get getAllCourses");
        
        const { data } = await axios.get(`${URL}/course/getAllCourses`, appJson);
        console.log("getAllCourses response : ",data);
        return data;
      } catch (error) {
        console.error("Error from getAllCourses:", error);
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );

  export const getCourseById = createAsyncThunk(
    'user/getCourseById',
    async ({ id, userId }, { rejectWithValue }) => {
      try {
        // console.log('Reached getCourseById');
        const config = {
          headers: {
            'user-id': userId,
          },
        };
        const { data } = await axios.get(`${URL}/course/getCourse/${id}`, config);
        console.log('getCourseById response : ', data);
        return data;
      } catch (error) {
        console.error('Error from getCourseById:', error);
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

export const addNewCourse = createAsyncThunk("instructore/create-course",
    async (courseData,{rejectWithValue})=>{
        try {
            console.log("Add new course action data",courseData);
            
            const { data } = await axios.post(
                `${URL}/course/create-course`,
                courseData,
                config
            );
            console.log("Add new course response : ", data);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchInstructorCourses = createAsyncThunk("instructore/fetchMyCourses",
    async (id,{rejectWithValue})=>{
        console.log("Reach instrucore course",id);
        try {
            const  data =await axios.get(`${URL}/course/fetchMyCourses/${id}`);
            return data.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const EditCourse = createAsyncThunk("instructore/edit-course",
    async (courseData,{rejectWithValue})=>{
        try {
            console.log("Edit course action data",courseData);
            
            const { data } = await axios.post(
                `${URL}/course/edit-course`,
                courseData,
                config
            );
            console.log("Edit course response : ", data);
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)