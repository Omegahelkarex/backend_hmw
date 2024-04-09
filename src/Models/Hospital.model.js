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

        bed : [
            {
                bedid : {
                    type : String,
                    required : true,
                    unique : true,
                }, 

                availability : {
                    type : Boolean,
                    default : false,

                }

            }
        ],

        doctor :{
            type : Schema.Types.ObjectId,
            ref : "Doctors"
        },

        facilites : {
            type : String,
            enum : ["Emergency care", "Inpatient services ", "Diagnostic services", "Treatment services", "Outpatient clinic",
                      "Specialized department", "Maternity and childcare", "Pharmacy", "Rehabilitation services", "Telemedicine services", "General checkup"]  
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

// this is a example

