
//Backend with the MVC pattern (models, controller, and router folder seperate)
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
const fs = require('fs');

// To Connect client with server and parse JSON data
app.use(cors());
dotenv.config();
app.use(express.json());
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")))
connectToMongo();

//Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    }, filename: (req, file, cb) => {        
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: storage });

// File Port
app.post("/file/upload", upload.single('file'), (req, res) => {
    try {
        res.status(201).json('uploaded')
        console.log(req.file)
    } catch (error) {
        res.send(error.message)
    }
});

// main-server-routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/post', postRouter);
app.use('/category', categoryRoute);


//home-server-route
app.use('/', (req, res) => {
    res.json(`welcome to ${port} port.`);
})

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.listen(port, () => {
    console.log(`connection to the ${port} ready and working`);
})
