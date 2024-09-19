import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice:{
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        plumber: {
            type: Boolean,
            required: true,
        },
        medical: {
            type: Boolean,
            required: true,
        },
        mechanics: {
            type: Boolean,
            required: true,
        },
        electrician: {
            type: Boolean,
            required: true,
        },
        driver: {
            type: Boolean,
            required: true,
        },
        civilEngineer: {
            type: Boolean,
            required: true,
        },
        catering: {
            type: Boolean,
            required: true,
        },
        uncategorized: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
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
    }, 
    {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;