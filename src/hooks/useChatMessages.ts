import { useCallback, useEffect, useState } from "react";
import useChatConnection from "./useChatConnection";
import { Message } from "../utils/types";

const MESSAGE_WINDOW = 30;

const welcomeMessage: Message = {
  id: "welcome-message",
  author: {
    rgbColor: "darkorchid",
    badges: ["moderator"],
    name: "ChatBot",
  },
  content: "Welcome to Chat Realtime!",
};

export default function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);

  const { socket } = useChatConnection();

  const appendNewMessage = useCallback(
    (newMessage: Message) => {
      const nextMessages: Message[] = [
        ...messages.slice(-MESSAGE_WINDOW),
        newMessage,
      ];
      setMessages(nextMessages);
    },
    [messages]
  );

  const send = useCallback(
    (message: string) => {
      console.log(`Sending message: ${message}`);
      socket?.emit("message", message);
    },
    [socket]
  );

  useEffect(() => {
    socket?.on("new-message", (msg: Message) => {
      appendNewMessage(msg);
    });

    return () => {
      socket?.off("new-message");
    };
  }, [appendNewMessage, socket]);

  return {
    messages,
    send,
  };
}
