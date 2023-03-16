const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')

// Create User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const findUser = await User.findOne({ email: email })
  if (!findUser) {
    // Create a new User
    const newUser = await User.create(req.body)
    res.json(newUser)
  } else {
    // res.json({
    //   msg: 'User Already Exists',
    //   success: false,
    // })
    throw new Error('User Already Exists')
  }
})

// Login

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // console.log(email, password)
  // check if user exists or not
  const findUser = await User.findOne({ email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    })
  } else {
    throw new Error('Invalid Credentials')
  }
})

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()
    res.json(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  // console.log(req.params)
  const { id } = req.params
  // console.log(id)
  try {
    const getaUser = await User.findById(id)
    res.json({
      getaUser,
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Update a user

const updateUser = asyncHandler(async (req, res) => {
  // const { id } = req.params
  const { _id } = req.user
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    )
    res.json(updateUser)
  } catch (error) {
    throw new Error(error)
  }
})
// Delete a user

const deleteaUser = asyncHandler(async (req, res) => {
  // console.log(req.params)
  const { id } = req.params
  // console.log(id)
  try {
    const deleteaUser = await User.findByIdAndDelete(id)
    res.json({
      deleteaUser,
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Block User

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    )
    // res.json({
    //   message: 'User Blocked',
    // })
    res.json(block)
  } catch (error) {
    throw new Error(error)
  }
})
// Unblock User

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    )
    // res.json({
    //   message: 'User UnBlocked',
    // })
    res.json(unblock)
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
}
