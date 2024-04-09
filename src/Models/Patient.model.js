import  Mongoose  from "mongoose";

const Schema = Mongoose.Schema;

const patientSchema = new Schema(

    {
        personalinformation : {
            fullname : {
                type : String,
                required : true,
            },

            dateofbirth :{
                type : String,
                required : true,
            },

            gender :{
                type : String,
                required : true,
                enum :["male","female","other"],

            },

            email : {
                type : String,
                unique : true,
                required : true,
            },

            phoneno : {
                type : Number,
                required : true,
                unique : true,
            },

            address : {
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
        },

        medicalhistory : {
            type : string,
        }
    },

    {
        timestamps :true,
    }
);


export const Patient = Mongoose.model("Paient", patientSchema);