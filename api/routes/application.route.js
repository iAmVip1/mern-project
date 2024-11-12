import express from 'express';
import { createApplication, deleteApplication } from '../controllers/application.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createApplication);
router.delete('/delete/:id', verifyToken, deleteApplication);
export default router;