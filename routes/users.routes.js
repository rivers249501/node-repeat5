const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
  // updateUser,
  // deleteUser
} = require('../controllers/users.controller');
// ,middlaware
const { 
  validateSession
} = require('../middlewares/auth.middleware')

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id',validateSession, getUserById);

router.post('/',validateSession, createNewUser);

router.post('/login', loginUser)

// router.patch('/:id', updateUser);

// router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
