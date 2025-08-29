import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "incoming" | "outgoing";
};

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, how are you doing today?", sender: "incoming" },
    { id: 2, text: "I’m doing great, thanks! Working on the new design.", sender: "outgoing" },
    { id: 3, text: "That’s awesome. Can’t wait to see it!", sender: "incoming" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { id: Date.now(), text: input, sender: "outgoing" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_N8N_TEST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: input }),
      });
      const data = await response.json();
      console.log(data);
      setMessages((prev) => [...prev, { id: Date.now(), text: data.text || "(No response)", sender: "incoming" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now(), text: "Error: could not connect to workflow.", sender: "incoming" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-background">
        {loading ? (
          <img id="loading_gif" src="/BeeMovie_GIF1.gif" alt="loading background" />
        ) : (
          <img
            src="https://i.pinimg.com/1200x/30/5b/5e/305b5e3a74505b9d661df621ebfb72d7.jpg"
            alt="background"
          />
        )}
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`chat-bubble ${msg.sender}`}
          >
            {msg.text}
          </motion.div>
        ))}
        {/* No separate loading bubble; GIF is shown as background while loading */}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
