import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const Schema = mongoose.Schema;

const userSchema = new Schema(

    {
        fullname : {
            type: String,
            required: true,
            trim: true,
        },

        email : {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        phone :{
            type : Number,
            required : true,
        }, 

        password :{
            type : String,
            required : true,
        },

        refreshtoken : {
            type : String,
        }
    }, 

    {
        timestamps : true,
    }
);

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
        
    }
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign (
        {_id: this._id, email: this.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({_id: this._id}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export const User = mongoose.model("User", userSchema);