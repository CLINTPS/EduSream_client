import axios from "axios";
import toast from 'react-hot-toast';


const ImageUplode = async (image)=> {
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
    const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY;

    const formData = new FormData();

    formData.append('file',image);
    formData.append('upload_preset',preset_key);
    formData.append('folder','EduStream/images');

    try {
        
        console.log("Reached cloudanary image uplode");
        
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        console.log('image uploaded successfully :',res);
        const { format, secure_url } = res.data;
        console.log('image secure_url....... :',secure_url);

        if (['png', 'jpeg', 'jpg'].includes(format)) {
            console.log('shring the url data :',secure_url);
            return secure_url
        } else {
            toast.error('Image format jpg or png allowed')
            return null;
        }

    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }

}

export default ImageUplode