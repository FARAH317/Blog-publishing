const jwt=require('jsonwebtoken');
const User=require('../models/User');
const protect=async (request, response, next)=> {
  const authHeader=request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Not authenticated' });
  }
  const token=authHeader.split(' ')[1];
  try {
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    const authenticatedUser=await User.findById(decoded.userId);
    if (!authenticatedUser) {
      return response.status(401).json({ message: 'User no longer exists' });
    }
    request.user=authenticatedUser;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};
module.exports=protect;
