import axios from "axios";
import toast from "react-hot-toast";

const VideoUplode = async(video)=>{
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
    const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY;

    const formData = new FormData();

    formData.append('file',video);
    formData.append('upload_preset',preset_key);
    formData.append('folder','EduStream/video');

    const transformationParams = {
        quality: 'auto', 
        resource_type: 'video', 
    };
    try {
        console.log("Reached cloudanary video uplode");

        const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formData,{
            params:transformationParams,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log('Video uploaded successfully :',res);
        const { format,secure_url }=res.data;
        if (['mp4', 'mov', 'avi','webm'].includes(format)) { 
            console.log('Video uploaded successfully:', secure_url);
            return secure_url;
        } else {
            console.log('Unsupported video format');
            return null;
        }

    } catch (error) {
        toast.error("can't upload video")
        console.error('Error uploading video:', error);
        throw error;
    }
}

export default VideoUplode;