import { useField, ErrorMessage } from "formik";
import { useState } from "react";
import ImageUplode from "../../../../util/ImageUplode";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const ImageUpload = ({ label, setFieldValue, ...props }) => {
  const [field, , helpers] = useField(props);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUploading(true);
      setError(null);
      setUploaded(false);

      try {
        const url = await ImageUplode(file);
        console.log("Image uploading after URL:", url);

        if (url) {
          helpers.setValue(url);
          setFieldValue(field.name, url);
          toast.success("Image uploaded successfully");
          setUploaded(true);
        } else {
          setFieldValue(field.name, null);
          helpers.setValue(null);
        }
      } catch (uploadError) {
        setError("Failed to upload image");
        setFieldValue(field.name, null);
        helpers.setValue(null);
      } finally {
        setUploading(false);
      }
    } else {
      setPreview(null);
      helpers.setValue(null);
      setFieldValue(field.name, null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
        <input
          id={field.name}
          name={field.name}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor={field.name}
          className="cursor-pointer flex flex-col items-center justify-center h-28 w-full bg-gray-50 rounded-md hover:bg-gray-100 transition"
        >
          {preview && uploaded ? (
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="h-28 w-auto object-cover rounded-md"
            />
          ) : (
            <span className="text-gray-500">
              {uploading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader color="#36D7B7" loading={uploading} size={35} />
                </div>
              ) : (
                <div>Click to upload or drag an image here</div>
              )}
            </span>
          )}
        </label>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default ImageUpload;