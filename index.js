const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

const config = require('./config');
const messageroutes = require('./routes/messageroutes');
const userroutes = require('./routes/userroutes');
const profileroutes = require('./routes/profileroutes');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = config.port;

app.use(cors());
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
    'mongodb+srv://abhinavgl:pVAzCVdC9CBoCksv@cluster0.atsxdhb.mongodb.net/messenger?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => {
    server.listen(port, () => {
        console.log(`App is running and listening on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});
