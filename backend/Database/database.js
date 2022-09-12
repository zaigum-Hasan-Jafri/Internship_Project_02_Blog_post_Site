
const mongoose = require('mongoose');

// const MONGO_URI = "mongodb+srv://zaigum:adilbhai@logindatabase.lcyme.mongodb.net/BlogsInfo?retryWrites=true&w=majority"
const connectToMongo = () => {
  //Mongo connection
  mongoose.connect(process.env.MONGO_URI || MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  mongoose.connection.on(`connected`, (err) => {
    if (err)
      throw err || "disconnected";
    console.log(`connected to the MongoDB DataBase ${mongoose.connection.host}`);
  })

}
module.exports = connectToMongo;

