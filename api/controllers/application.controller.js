import Application from "../models/application.model.js";
import { errorHandler } from "../utils/error.js";

export const createApplication = async (req, res, next) =>{
    try {
        const application = await Application.create(req.body);
        return res.status(201).json(application);

    } catch (error) {
        next(error);
        
    }
}

export const deleteApplication = async (req, res, next) =>{
    const application = await Application.findById(req.params.id);

    if (!application) {
        return next (errorHandler(404, 'Application not found'));
    }
    if ( !req.user.isAdmin && req.user.id !== application.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own applications!'));
    }
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.status(200).json('Application has been deleted! ')
    } catch (error) {
        next(error);
    }
}

export const updateApplication = async (req, res, next) =>{
    const application = await Application.findById(req.params.id);
    if (!application) {
        return next (errorHandler(404, 'Post not found'));
    }
    if (!req.user.isAdmin && req.user.id !== application.userRef) {
        return next(errorHandler(401, 'You can only update your own application!'));
    }

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedApplication);
    } catch (error) {
        next(error)
    }
}

export const getApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return next(errorHandler(404, 'Application not found'))
        }
        res.status(200).json(application);
    } catch (error) {
        next(error)
    } 
    }

    export const getApplications = async (req, res, next) => {
      try {
          const limit = parseInt(req.query.limit) || 9;
          const startIndex = parseInt(req.query.startIndex) || 0;

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
      
      const Applications = await Application.find(query)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
        const totalApplications = await Application.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthApplications = await Application.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      
  
        return res.status(200).json(Applications, totalApplications,
          lastMonthApplications,);
  
      } catch (error) {
          next(error);
      }
  }