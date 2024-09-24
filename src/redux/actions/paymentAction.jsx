// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { URL } from "../../common/api";
// import axios from "axios";
// import { config } from "../../common/configurations";

// export const makePayment = createAsyncThunk('user/makePayment',
//     async(data,{rejectWithValue})=>{
//         try {
//             console.log("Make payment action data",data);
//             const {response} = axios.post(
//                 `${URL}/payment/create-checkout-session`,
//                 data,
//                 config
//             )
//             console.log("Make payment action data",response);
//             return response
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     })