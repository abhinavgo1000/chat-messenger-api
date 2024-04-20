const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');

const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');
const config = require('./config');
const messageroutes = require('./routes/messageroutes');
const userroutes = require('./routes/userroutes');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    User.findById(1)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => {
        console.log(err);
    });
});

const port = config.port;

app.use(cors());
app.use('/messages', messageroutes);
app.use('/users', userroutes);

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

mongoConnect(() => {
    server.listen(port, () => {
        console.log(`App is running and listening on port ${port}`);
    });
});
