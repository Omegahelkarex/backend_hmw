import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Hospital } from "../Models/Hospital.model.js";
import { convertImageToBase64 } from "../utils/imagetodatauri.js";
import { uploadCloudinaryImage } from "../utils/cloudinary.js";

const generateAccessandRefreshToken = async (hospitalId) => {
    try {
        let hospital = await Hospital.findById(hospitalId)
        const accessToken = await hospital.generateAccessToken()
        const refreshToken = await hospital.generateRefreshToken()
        hospital.refreshtoken = refreshToken
        await hospital.save({validateBeforeSave : false})
        return {accessToken, refreshToken}
    } catch (error){
        throw new ApiError(500, "Internal server error")
    }
}

const registerHospital = asyncHandler(async (req, res) => {
        const {
            hospitalname,
            hospitalid,
            email,
            password,
            street,
            city,
            pincode,
            state,
            phone,
            bedid,
            availability,
            facilities,
        } = req.body

       if (
        [
            hospitalname,
            hospitalid,
            email,
            password,
            street,
            city,
            pincode,
            state,
            phone,
            bedid,
            availability,
            facilities
        ].some((field) => field?.trim === "")
       ){
        throw new ApiError(400,"All fields are required")
       }
       let hospital = await Hospital.findone({email})
       if (hospital) {
        throw new ApiError(400,"Hospital account already exists")
       }
       const file=req.file;
       if(!file){
        throw new ApiError(400,"All fields are required");
       }
       const dataUri=convertImageToBase64(file);
       const imageCloudinary=uploadCloudinaryImage(dataUri);
       if(!imageCloudinary){
        throw new ApiError(400,"Image upload failed")
       }

        hospital = await Hospital.create({
            hospitalname,
            hospitalid,
            email,
            password,
            address : {
                street,
                city,
                pincode,
                state,
            },
            phone,
            bed : {
                bedid,
                availability,
            },
            facilities,
            hospitalphotourl:imageCloudinary.secure_url

        })

        return res
        .status(201)
        .json(new ApiResponse(201, hospital, "Hospital created successfully"))
})

const hospitalLogin = asyncHandler (async (req, res) => {
    const { email, password} = req.body

    if(!email || !password ){
        throw new ApiError(400, "All fields are required")
    }

    if ([email,password].some((field) => !field.trim())) {
        throw new ApiError(400,"All fields are required")
    }

    let hospital = await Hospital.findOne({ email })
    if (!hospital){
        throw new ApiError(404, "Hospital not found")
    }

    let isMatch = hospital.comparePassword(password)
    if (!isMatch){
        throw new ApiError(401,"Incorrect email or password")
    }

    const { accessToken, refreshToken} = await generateAccessandRefreshToken(hospital._id)

    const loggedInHospital = await Hospital.findById(hospital._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {hospital : loggedInHospital, accessToken, refreshToken},
            "Hospital logged in succesfully"
        )
    )
})

const logoutHospital = asyncHandler (async (req, res) => {
    await Hospital.findByIdAndUpdate(
        req.hospital._id,
        {refreshtoken : null},
        {new : true}
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res 
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, null, "Hospital logged out successfully")
    )
})




















export { registerHospital, hospitalLogin, logoutHospital }