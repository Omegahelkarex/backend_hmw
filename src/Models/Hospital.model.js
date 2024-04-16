import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      
        facilites : {
            type : String,
            enum : ["Emergency care", "Inpatient services ", "Diagnostic services", "Treatment services", "Outpatient clinic",
                      "Specialized department", "Maternity and childcare", "Pharmacy", "Rehabilitation services", "Telemedicine services", "General checkup"]  
        },

        hospitalphotourl :{
            type : String,
            required : true,
        },


        refreshtoken : {
            type: String,
        }

        



    
    }, 

    {
        timestamps: true,
    }

);

hospitalSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
});

hospitalSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

hospitalSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {_id: this._id, email:this.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    );
};

hospitalSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export const Hospital = mongoose.model("Hospital", hospitalSchema);

