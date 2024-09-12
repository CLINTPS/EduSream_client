import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../common/api";
import axios from "axios";
import { config } from "../../common/configurations";


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