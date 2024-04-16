const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes/routes');

const db = require('./utils/database');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = config.port;

app.use(cors());
app.use('/messages', routes);

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

server.listen(port, () => {
    console.log(`App is running and listening on port ${port}`);
});
