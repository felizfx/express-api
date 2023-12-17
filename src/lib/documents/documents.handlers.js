export function emitText(value, name) {
	const socket = this;
	// io.emit("txt-receiving", value); //emitir para todos os users conectados
	socket.to(name).emit("txt-receiving", value); // emitir para todos, menos os user que enviou 
}