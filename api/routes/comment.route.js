import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment, getListingComments
  
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getListingComments/:listingId', getListingComments);


export default router;