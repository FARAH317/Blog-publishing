const User=require('../models/User');
const generateToken=require('../utils/generateToken');
const register=async (request, response)=> {
  try {
    const {name,email,password}=request.body;
    if (!name || !email || !password) {
      return response.status(400).json({ message: 'Name, email and password are required' });
    }
    const existingUser=await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: 'Email is already registered' });
    }
    const newUser=await User.create({ name, email, password });
    const token=generateToken(newUser._id);
    response.status(201).json({
      token,
      user:{ id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    response.status(500).json({ message:'Registration failed'});
  }
};
const login=async(request, response)=> {
  try {
    const {email,password}=request.body;
    if (!email || !password) {
      return response.status(400).json({ message: 'Email and password are required' });
    }
    const existingUser=await User.findOne({ email }).select('+password');
    if (!existingUser) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatches=await existingUser.comparePassword(password);
    if (!passwordMatches) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
    const token=generateToken(existingUser._id);
    response.json({
      token,
      user: { id: existingUser._id, name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    response.status(500).json({ message: 'Login failed' });
  }
};
const getCurrentUser=async (request, response)=> {
  response.json({
    id: request.user._id,
    name: request.user.name,
    email: request.user.email,
  });
};
module.exports={ register, login, getCurrentUser };
