const express=require('express');
const { deleteComment }=require('../controllers/commentController');
const protect=require('../middleware/authMiddleware');
const router=express.Router();
router.delete('/:commentId', protect, deleteComment);
module.exports=router;
