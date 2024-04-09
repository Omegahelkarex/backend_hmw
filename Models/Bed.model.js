import mongoose from ("mongoose");

const Schema = mongoose.Schema;

const bedSchema = new Schema(

    {
        hospitalid :{
            type : Schema.Types.ObjectId,
            ref : "Hospital",
        },

        
        bedid :{
            type : String,
            unique: true,
            required: true,
        },

        availability :{
            type : Boolean,
            default : false,
        },
        
    },

    {
        timestamps: true,
    },
);

export const Bed = mongoose.model("Bed", bedSchema);