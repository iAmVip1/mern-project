import Application from "../models/application.model.js";

export const createApplication = async (req, res, next) =>{
    try {
        const application = await Application.create(req.body);
        return res.status(201).json(application);

    } catch (error) {
        next(error);
        
    }
}