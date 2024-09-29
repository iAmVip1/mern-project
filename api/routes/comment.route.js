import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment, getListingComments, likeComment
  
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getListingComments/:listingId', getListingComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);


export default router;