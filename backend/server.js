require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDatabase=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/commentRoutes');
const { notFound, errorHandler }=require('./middleware/errorHandler');
connectDatabase();
const app=express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (request, response)=> {
  response.json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use(notFound);
app.use(errorHandler);
const port=process.env.PORT || 5000;
app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});
