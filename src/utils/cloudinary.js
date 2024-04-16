import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.SECRET_KEY,
});

const uploadCloudinaryImage = async (datauri) => {
    try {
        if(!datauri)
        {
            return null ;
        }

        const res = await cloudinary.uploader.upload(datauri, {
            folder: 'hospital_patient_images',
        });
        return res ;
    } catch (error) {
        console.log("error")
        console.log(error)
        return error ;
    }
};

export {uploadCloudinaryImage};