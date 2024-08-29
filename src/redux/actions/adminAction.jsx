import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../common/api";
import axios from "axios";
import { config } from "../../common/configurations";

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${URL}/auth/getAllUser`, config);
        const allUsers = data.data.allData;
        const students = allUsers.filter(user => user.role === 'student');
        const instructors = allUsers.filter(user => user.role === 'instructor');
        return { students, instructors };
    } catch (error) {
        console.error("Error fetching users:", error);
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

// export const blockUnblockUser= createAsyncThunk('admin/blockUnblockUser', async ({userId, isBlocked},{rejectWithValue}) => {
//     try {
//         const { data } = await axios.post(`${URL}/auth/blockUnblockUser`,{ userId, isBlocked },config);
//         console.log("blockUnblockUser"),data;
//         return { userId, isBlocked: !isBlocked};
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })