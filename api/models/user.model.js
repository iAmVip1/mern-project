import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://preview.redd.it/avatar-the-way-of-water-opinions-on-chud-v0-smmk2bzmmqha1.jpg?width=640&crop=smart&auto=webp&s=6d739c05de2158bf8989cf58a355b4fded43fd53",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, 
{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;