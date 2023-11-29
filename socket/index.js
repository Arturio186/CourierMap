"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: JSON.parse((_a = process.env.CLIENT) !== null && _a !== void 0 ? _a : ''),
    },
});
let onlineUsers = [];
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('new connection');
    socket.on('user', ({ userId, role }) => {
        onlineUsers.map((user, index) => user.userId === userId && onlineUsers.splice(index, 1));
        onlineUsers.push({
            userId,
            socketId: socket.id,
            role,
        });
        console.log('new con');
    });
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
}));
server.listen(process.env.PORT, () => {
    console.log(`Socket server is listening on port ${process.env.PORT}`);
});
