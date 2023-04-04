const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Database connected successfully!');
   } catch (error) {
      console.log(error);
      throw new Error('Error connecting to database');
   }
};

module.exports = {
   dbConnection,
};
