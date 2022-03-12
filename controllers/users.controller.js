const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// Models
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');
const { Comment } = require('../models/comment.model');

// Utils
// const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsyn');
const { AppError } = require('../util/appError');

dotenv.config({path: '../config.env'})
// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Nested includes
  const users = await User.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
            include: [{ model: User }]
          }
        ]
      },
      { model: Comment, include: [{ model: Post }] }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});

// Get user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

// Save new user
exports.createNewUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  // MUST ENCRYPT PASSWORD
  //regla de oro, jamas almacenar el password de forma plana, 
const salt = await bcrypt.genSalt(12)
const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {

  const { email, password} = req.body

  const user = await User.findOne({ where: {email, status: 'active'}})

  if(!user || !(await  bcrypt.compare(password, user.password))  ){
    return next(new AppError(404, 'Credenctail are invalid'))
  }
// generacion de credenciales de validacion  (token)
//token 

const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN
})
  console.log(token);
  res.status(200).json({
    status: 'success',
    data: {
      token
    }
  })
})