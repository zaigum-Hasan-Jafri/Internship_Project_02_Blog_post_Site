
// //Backend with the MVC pattern (models, controller, and router folder seperate)
// const cookieParser = require("cookie-parser");
const express = require('express');
const multer = require("multer")
const dotenv = require('dotenv');
const connectToMongo = require('./Database/database');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const authRouter = require("./Router/Auth.routes");
const userRouter = require("./Router/User.routes");
const postRouter = require("./Router/Post.routes");
const categoryRoute = require('./Router/Category.routes');
const path = require('path');
// const User = require('./models/UserSchema');


app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
// app.use(cookieParser())
connectToMongo();

//Storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: multerStorage });

app.post("/file/upload", upload.single('file'),(req, res) => {
   try {
    res.status(201).json('uploaded')
    console.log(req.file)
   } catch (error) {
    res.send(error.message)
   }
});

// routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/post', postRouter);
app.use('/category', categoryRoute);



app.use('/', (req, res) => {
    res.json(`welcome to ${port} port.`);
    console.log("welcome")
})
app.listen(port, () => {
    console.log(`connection to the ${port} ready and working`);
})
