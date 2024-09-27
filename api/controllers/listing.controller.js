import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    } catch (error) {
        next(error);
        
    }
}

export const deleteListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next (errorHandler(404, 'Post not found'));
    }
    if ( !req.user.isAdmin && req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Post has been deleted! ')
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next (errorHandler(404, 'Post not found'));
    }
    if (!req.user.isAdmin && req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Post not found'))
    }
    res.status(200).json(listing);
} catch (error) {
    next(error)
} 
}

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        // plumber
        let plumber = req.query.plumber;

    if (plumber === undefined || plumber === 'false') {
      plumber = { $in: [false, true] };
    }

     // medical
     let medical = req.query.medical;

     if (medical === undefined || medical === 'false') {
       medical = { $in: [false, true] };
     }

      // mechanics
      let mechanics = req.query.mechanics;

      if (mechanics === undefined || mechanics === 'false') {
        mechanics = { $in: [false, true] };
      }

       // electrician
       let electrician = req.query.electrician;

       if (electrician === undefined || electrician === 'false') {
         electrician = { $in: [false, true] };
       }

        // driver
        let driver = req.query.driver;

    if (driver === undefined || driver === 'false') {
      driver = { $in: [false, true] };
    }

     // civilEngineer
     let civilEngineer = req.query.civilEngineer;

     if (civilEngineer === undefined || civilEngineer === 'false') {
       civilEngineer = { $in: [false, true] };
     }

      // catering
      let catering = req.query.catering;

      if (catering === undefined || catering === 'false') {
        catering = { $in: [false, true] };
      }

       // plumber
       let uncategorized = req.query.uncategorized;

       if (uncategorized === undefined || uncategorized === 'false') {
         uncategorized = { $in: [false, true] };
       }


       let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['day', 'hour'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';
    const query = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    
    if (plumber !== undefined) query.plumber = plumber;
    if (medical !== undefined) query.medical = medical;
    if (mechanics !== undefined) query.mechanics = mechanics;
    if (electrician !== undefined) query.electrician = electrician;
    if (driver !== undefined) query.driver = driver;
    if (civilEngineer !== undefined) query.civilEngineer = civilEngineer;
    if (catering !== undefined) query.catering = catering;
    if (uncategorized !== undefined) query.uncategorized = uncategorized;
    if (type !== undefined) query.type = type;
    
    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    
    // const listings = await Listing.find({
    //     name: { $regex: searchTerm, $options: 'i' },
    //     // address: { $regex: searchTerm, $options: 'i' },
    //     plumber,
    //     medical,
    //     mechanics,
    //     electrician,
    //     driver,
    //     civilEngineer,
    //     catering,
    //     uncategorized,
    //     type,
    //   }).sort({ [sort]: order })
    //   .limit(limit)
    //   .skip(startIndex);

      return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}