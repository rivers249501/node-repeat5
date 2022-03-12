// Models
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');
//utils
const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsyn');
const { AppError } = require('../util/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  
    // SELECT * FROM comments
    // WHERE status = 'active'
    // JOIN users ON comments.userId = users.id
    const comments = await Comment.findAll({
      where: { status: 'active' },
      include: [{ model: User }]
    });

    res.status(200).json({
      status: 'success',
      data: { comments }
    });
  
});

exports.getCommentById = catchAsync(async (req, res, next) => {

  const { id } = req.params;

    const comment = await Comment.findOne({
      where: { status: 'active', id }
    });

    if (!comment) {
      return next(new AppError(404, 'User not found'));;
      
    }

    res.status(200).json({
      status: 'success',
      data: { comment }
    });
  
});

exports.createComment = catchAsync(async (req, res ) => {

  const { text, postId, userId } = req.body;

    if (!text || !postId || !userId) {
      return next(
        new AppError(400, 'Must provide a valid title, content and UserId'))
      
    }

    const newComment = await Comment.create({
      text,
      postId,
      userId
    });

    res.status(201).json({
      status: 'success',
      data: { newComment }
    });
  
});
