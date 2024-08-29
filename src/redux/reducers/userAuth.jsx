import { createSlice } from "@reduxjs/toolkit";
import { signup,login,getUserData, googleSignup, updateUserRole } from "../actions/userAction";


const userSlice=createSlice({
    
    name:"user",
    initialState:{
        loading:false,
        user:null,
        error:null,
    },
    reducers:{
        updateUserOnOTPValidation:(state,{payload})=>{
            state.user=payload;
        },
        updateError:(state,{payload})=>{
            state.error=payload
        }
    },
    extraReducers:(builder)=>{
        console.log("Reached action,reducer,userAuth");
        builder
        .addCase(signup.fulfilled,(state,{payload})=>{
            console.log("User signup payload",payload);
            
            state.loading=false,
            state.error=null,
            state.user=payload.data;
        })
        .addCase(signup.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(signup.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload;
        })
        .addCase(login.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(getUserData.pending,(state)=>{
            state.loading=true 
        })
        .addCase(getUserData.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(getUserData.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(googleSignup.pending,(state)=>{
            state.loading=true 
        })
        .addCase(googleSignup.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(googleSignup.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(updateUserRole.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUserRole.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.user = { ...state.user, role: payload.role };
          })
          .addCase(updateUserRole.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          });
    }
})

export const {updateUserOnOTPValidation,updateError}=userSlice.actions
export default userSlice.reducer;