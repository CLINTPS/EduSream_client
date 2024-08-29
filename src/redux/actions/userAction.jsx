import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { multiForm,config} from '../../common/configurations'
import {URL} from '../../common/api'

export const signup=createAsyncThunk('user/signup',async (userCredentials,{rejectWithValue})=>{
    try {
        console.log("Redux,action,userAcrtion : ",userCredentials);
        const {data}=await axios.post(`${URL}/auth/signup`,userCredentials,multiForm)
        console.log("Signup response : ",data);
        return data
    } catch (error) {
        console.log('Error from signup', error.response.data.message);
        return rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk('user/login',async(userCredentials, { rejectWithValue })=>{
    console.log("User login credentioals",userCredentials);
    
    try {
        const {data}=await axios.post(`${URL}/auth/login`,userCredentials,config)
        console.log("Login response : ",data);
        return data.data
    } catch (error) {
        console.error("Error from login:",error);
        return rejectWithValue(error.response?.data || "An error occurred");
    }
})

export const getUserData = createAsyncThunk('user/getUserData',async(_, {rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/auth/`,config)
        console.log("getUserData response : ",data);
        return data
    } catch (error) {
        console.error("Error from getUserData:",error);
        return rejectWithValue(error.response?.data || "An error occurred");
    }
})

export const logOut = createAsyncThunk('user/logOut',async (_, { rejectedWithValue }) => {
    try {
        const { data } = await axios.delete(`${URL}/auth/logout`, config)
        console.log(data);
        return data
    } catch (error) {
        console.error("Error from logout:",error);
        return error
    }
})

export const googleSignup = createAsyncThunk('user/googleSignup', async (userCredentials,{ rejectWithValue})=>{
    try {
        console.log("Google auth reached :::::::::: ",userCredentials);
        const { data } = await axios.post(`${URL}/auth/googleSignup`,userCredentials,config)
        console.log("Google auth data : ",data);
        return data
    } catch (error) {
        console.error("Error from google signup:",error);
        return error
    }
})

export const updateUserRole = createAsyncThunk(
    'user/updateUserRole',
    async ({ role, email }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${URL}/auth/update-role`, { role, email }, config);
        return data;
      } catch (error) {
        console.error('Error updating role:', error);
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );