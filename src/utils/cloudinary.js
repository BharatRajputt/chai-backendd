import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
               
cloudinary.config({ 
  cloud_name:process.env.CLOUDNARY_CLOUD_NAME, 
  api_key:process.env.CLOUDNARY_API_KEY, 
  api_secret:process.env.CLOUDNARY_API_SECRET 
});


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if (!localFilePath) return null

        /// cloudinary upload

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
    //    console.log(response);
        //// file has been uploaded successfully

        // console.log("file is uploaded on cloudianry ",response.url);
       fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)   // remove the locally save temp file as the upload operation get failed
        return null
    }

}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });


  export {uploadOnCloudinary}