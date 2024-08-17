import { Chat } from "./components/Chat";
import useChatConnection from "./hooks/useChatConnection";

function App() {
  const { isConnected } = useChatConnection();
  return (
    <main className="grid h-screen place-items-center">
      {isConnected ? "Connected" : "Not connected"}
      <Chat />
    </main>
  );
}

export default App;
