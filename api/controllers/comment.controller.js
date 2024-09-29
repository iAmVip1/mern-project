import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, listingId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      listingId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getListingComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ listingId: req.params.listingId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments)
  } catch (error) {
    next(error);
  }
}