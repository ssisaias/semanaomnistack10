const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const {setupWebSocket} = require('./websocket');

dotenv.config();

const server = http.Server(app);
setupWebSocket(server);

mongoose.connect(process.env.DB_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
// app.use(cors({ origin:'http://localhost:3000' }))
app.use(express.json());
app.use(routes);


// Listen on 3003
server.listen(3003);