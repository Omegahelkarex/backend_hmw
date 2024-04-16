import { asyncHandler } from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/ApiError.js"
import { User } from "../Models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 

const generateAccessandRefreshToken = async (userId) => {
    try {
        let user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false})
        return { accessToken, refreshToken}   
    } catch (error) {
        throw new ApiError(500, "Internal server error")
    }
} 




const registerUser = asyncHandler(async (req, res) => {
   
    const {fullname, email, phone, password} = req.body
    
    if([fullname, email, phone, password].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All fields are compulsory")
    }

    const oldUser =  await User.findOne({
        $or :[{ email }, { phone }]
    })

    if (oldUser) {
        throw new ApiError(409,"You already have an account with the given email or phone number")
    }

    const user = await User.create({
        fullname,email,phone,password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshtoken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser,"User created successfully")
    )


})

const loginUser = asyncHandler( async (req, res) => {
    const {email, phone, password} = req.body 

    if(!email || !phone){
        throw new ApiError(400,"email or phone is required")
    }

    const user = await User.findOne({
        $or :[{ email },{ phone}]
    })

    if(!user){
        throw new ApiError(404,"User doesnot exists")
    }

    let isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new ApiError(401,"Incorrect password or email or phone number")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {user: loggedInUser, accessToken, refreshToken },
            "user logged in successfully"
        )
    )

})

const logoutUser = asyncHandler (async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshtoken : undefined
            }
        },
        {
            new : true
        }
    )

     const options = {
        httpOnly: true,
        secure: true
    }

    return res 
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))

})







export {registerUser, loginUser, logoutUser}