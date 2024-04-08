import mongoose from "mongoose";



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
    }, 

    {
        timestamps : true,
    }
);

export const User = mongoose.model("User", userSchema);