const { createServer } = require('http');
const { readFileSync } = require('fs');

const { MongoClient } = require('mongodb');
const { Server } = require('socket.io');
const express = require('express');
const app = express();

const server = createServer(app);
const io = new Server(server);
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const PORT = 3000;

const homePage = readFileSync('./index.html', 'utf-8');

let message;
let database;

client.connect(() => {
    database = client.db('TPsocket');
    message = database.collection('message');
    username = database.collection('username');
  
    server.listen(PORT, () => console.log(`Server ready on port: ${PORT} !`))
  });

app.use(express.json());

app.get('/chat', (req,res)=>{
    res.end(homePage)
});

io.on(
    'connection', (socket) => {
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    },
    database.collection('message').insertOne({ message: msg }));