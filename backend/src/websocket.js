const socketio = require('socket.io');
const parseStringAsArrays = require('./utils/parseStringAsArrays');
const calculateDistance = require('./utils/calculateDistance');
const connections = [];

let io;

exports.setupWebSocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        // console.log(socket.id);
        // console.log(socket.handshake.query);
        const {latitude, longitude, techs} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArrays(techs),
        });
    })  
};

// Filtrar todas as conexões que estão dentro de 10km do novo item e que possuem a mesma tech
exports.findConnections = (coordinates, techs) =>{
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) <= 10
        && connection.techs.some(item=> techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message,data);
    });
}