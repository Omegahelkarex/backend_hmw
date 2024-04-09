import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hospitalSchema = new Schema(

    {
        hospitalname : {
            type : String,
            required : true, 

        },

        hospitalid : {
            type : String,
            required : true,
            unique : true,
        },

        email : {
            type : String,
            required : true,
            unique : true, 
        },

        password :{
            type : String,
            required : true,
        },

        address :{
            street: {
                type: String,
                required: true,
              },
              city: {
                type: String,
                required: true,
              },
              pincode: {
                type: Number,
                required: true,
              },
              state: {
                type: String,
                required: true,
              },
        },

        phone :{
            type : Number,
            required : true,
        },

        bedavailable : {
            type : Schema.Types.ObjectId,// ask tushar about here 
            ref : "Bed",
        }, 

        doctoravailable :{
            type : Schema.Types.ObjectId,
            ref : "Doctors"
        },

        facilites : {
            type : String,
            enum : ["facilities1", "facilities2", "facilities3"] // need to reasearch on the various facilities that have to be mentioned 
        },

        hospitalphotourl :{
            type : String,
            required : true,
        },

        



    
    }, 

    {
        timestamps: true,
    }

);

export const Hospital = mongoose.model("Hospital", hospitalSchema);

