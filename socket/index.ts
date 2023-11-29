import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { config } from 'dotenv';
config();

const server = createServer();

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT || '*',
	},
});

export interface IUser {
	userId: string;
	socketId: string;
	role: string;
}

let onlineUsers: IUser[] = [];

io.on('connection', async (socket: Socket) => {
    console.log('new connection')
	socket.on('user', ({ userId, role }) => {
		onlineUsers.map((user, index) => user.userId === userId && onlineUsers.splice(index, 1));
		onlineUsers.push({
			userId,
			socketId: socket.id,
			role,
		});
        console.log('new con')
	});

	socket.on('disconnect', () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Socket server is listening on port ${process.env.PORT}`);
});