const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    path: '/socket.io',
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    }
});

app.use(cors({
    origin: '*',
}));

io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    socket.on('chatMessage', (message) => {
       console.log('메시지 수신: ', message);

       io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('사용자가 연결 해제되었습니다.');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`)
});