import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
{
    fname: {
        type: String,
        required: true,
    },
    mname: {
        type: String,
        required: false,
    },
    lname: {
        type: String,
        required: true,
    },
    paddress: {
        type: String,
        required: true,
    },
    taddress: {
        type: String,
        required: true,
    },
    phoneNumber1: {
        type: Number,
        required: true,
    },
    phoneNumber2: {
        type: Number,
        required: true,
    },
    cvUrls: {
        type: Array,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
    userMail: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        required: true,
    },
    isWorker: {
        type: Boolean,
        default: false, 
      },  
},
{timestamps: true}

)
const Application = mongoose.model('Application', applicationSchema);

export default Application;