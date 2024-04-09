import mongooose from ("mongoose") ;

const Schema = mongooose.Schema ;

const doctorSchema = new Schema(

    {
        personalinormation: {
            fullname : {
                type : String,
                required: true,
                trim : true,
            },

            gender : {
                type : String,
                enum : ["male", "female"],
                required : true,
            },

            dob : {
                type : Date,
                min : '1900-01-01',
                max : '2006-01-01',
                required : true,
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

        professionalinformation : {
            medicallicensenumber : {
                type : String,
                unique : true,
                required : true,
            },

            speciality : {
                type : String,
                
                required : true,
            },

            qualification : {
                type : String,
                
                required : true,
            },

            


        }
    },

    {
        timestamps : true,
    },
);sz

export const Doctor = mongoose.model("Doctor", doctorSchema);