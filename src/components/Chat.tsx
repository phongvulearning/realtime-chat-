import { forwardRef } from "react";
import useChatLiveModeScrolling from "../hooks/useChatLiveModeScrolling";
import useChatMessages from "../hooks/useChatMessages";
import { Message } from "../utils/types";
import ChatMessage from "./ChatMessage";
import { SendMessageForm } from "./SendMessageForm";
import ChatPausedAlert from "./ChatPausedAlert";

export const Chat = () => {
  const { messages, send } = useChatMessages();

  const { chatMessagesBoxRef, scrollNewMessages, isLiveModeEnabled } =
    useChatLiveModeScrolling(messages);

  return (
    <div className="relative w-full max-w-[550px] px-4 py-3 rounded-lg bg-slate-900 opacity-80">
      {/* @ts-ignore */}
      <ChatMessagesBox messages={messages} ref={chatMessagesBoxRef} />
      {!isLiveModeEnabled && (
        <ChatPausedAlert
          onClick={scrollNewMessages}
          className="absolute inset-x-0 bottom-28 mx-auto"
        />
      )}
      <SendMessageForm onSend={send} className="mt-4" />
    </div>
  );
};

// eslint-disable-next-line react/display-name
const ChatMessagesBox = forwardRef<HTMLDivElement, { messages: Message[] }>(
  ({ messages }, ref) => {
    const messsageList = messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ));

    return (
      <div ref={ref} className="h-[70vh] overflow-auto">
        {messsageList}
      </div>
    );
  }
);
