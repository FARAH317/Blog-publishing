const mongoose=require('mongoose');
const connectDatabase=async ()=> {
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Mongodb connection failed: ${error.message}`);
    process.exit(1);
  }
};
module.exports=connectDatabase;
