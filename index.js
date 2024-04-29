const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
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
const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions'
});
const csrfProtection = csrf();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);

const port = config.port;

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(cors());
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
