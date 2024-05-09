const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { Server } = require('socket.io');
const cors = require('cors');

const config = require('./config');
const authroutes = require('./routes/authroutes');
const messageroutes = require('./routes/messageroutes');
const userroutes = require('./routes/userroutes');
const profileroutes = require('./routes/profileroutes');

const MONGO_URL = 'mongodb+srv://abhinavgl:pVAzCVdC9CBoCksv@cluster0.atsxdhb.mongodb.net/messenger?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const server = http.createServer(app);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

const port = config.port;

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authroutes);
app.use('/messages', messageroutes);
app.use('/users', userroutes);
app.use('/profiles', profileroutes);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({message: message});
});

mongoose.connect(
    MONGO_URL
)
.then(() => {
    server.listen(port, () => {
        console.log(`App is running and listening on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});
