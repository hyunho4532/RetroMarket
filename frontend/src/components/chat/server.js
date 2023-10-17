const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = new Map();

wss.on('connection', (ws) => {
    console.log('클라이언트가 연결되었습니다.');

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'joinRoom') {
            const { roomId } = data;
            ws.roomId = roomId;

            if (!rooms.has(roomId)) {
                rooms.set(roomId, []);
            }

            rooms.get(roomId).push(ws);

            console.log(`사용자가 방 ${roomId}에 참여하였습니다.`);
        } else if (data.type === 'chatMessage') {
            const { room, message } = data;
            const roomClients = rooms.get(room) || [];

            for (const client of roomClients) {
                if (client.roomId === room) {
                    client.send(JSON.stringify({ type: 'chatMessage', message }));
                }
            }
        }
    });

    ws.on('close', () => {
        if (ws.roomId && rooms.has(ws.roomId)) {
            rooms.set(
                ws.roomId,
                rooms.get(ws.roomId).filter((client) => client !== ws)
            );
        }
        console.log('클라이언트가 연결 해제되었습니다.');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});