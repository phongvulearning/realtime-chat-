import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;

console.log("ENDPOINT", ENDPOINT);
const connect = () => {
  return io(ENDPOINT, {
    reconnectionAttempts: 5,
  });
};

export default function useChatConnection() {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("Connecting...");
    const socket = connect();

    socket.on("connect", () => {
      console.log("Connected!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected!");
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      console.log(`Disconnecting...`);
      socket.close();
    };
  }, []);

  return { isConnected, socket };
}
