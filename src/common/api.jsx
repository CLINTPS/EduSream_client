import axios from 'axios'

export const URL = 'http://localhost:4000/api'

const apiInstance=axios.create({baseURL:URL});

apiInstance.interceptors.response.use((response)=>{
    return response.data
})
export const commonReduxRequests = async (
    method,
    route,
    body,
    config,
    rejectedWithValue
)=>{
    let requestConfig={
        method,
        url:route,
        data:body,
        headers:config,
        withCredentials:true
    }
    try {
        console.log('customers request')
        const response=await apiInstance(requestConfig)
        return response
    } catch (error) {
        console.log(error);
        return handleError(error,rejectedWithValue)
    }
}

export const commonRequest=async (method,route,body,config,rejectedWithValue)=>{
    let requestConfig={
        method,
        url:route,
        data:body,
        header:config,
        withCredentials:true
    }
    try {
        const response=await apiInstance(requestConfig)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}