import { useCallback, useState } from "react";
import EmojiPickerButton from "./EmojiPicker";

type SendMessageFormProps = {
  className?: string;
  onSend: (message: string) => void;
};
const MAX_MESSAGE_LENGTH = 300;

export const SendMessageForm = ({
  className,
  onSend,
}: SendMessageFormProps) => {
  const [message, setMessage] = useState("");

  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const filteredMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

      if (filteredMessage) {
        onSend(filteredMessage);
      }

      setMessage("");
    },
    [message, onSend]
  );

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={handleChangeMessage}
          className="w-full p-2 rounded bg-slate-700 focus:outline-none focus:ring-purple-500 focus:ring-2"
          placeholder="Send a chat message"
        />
        <div className="absolute inset-y-0 right-2 inline-flex items-center bg-slate-700">
          <EmojiPickerButton
            onEmojiPick={(emoji) => setMessage((msg) => msg.concat(emoji))}
          />
        </div>
      </div>
      <button
        className="bg-purple-600 p-2 float-right mt-2 rounded-md"
        type="submit"
      >
        Chat
      </button>
    </form>
  );
};
