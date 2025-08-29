import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: number;
  text: string;
  sender: "incoming" | "outgoing";
};

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, how is it going! Got any questions about the movie? Ask away!", sender: "incoming" },
    // { id: 2, text: "Why does Barry feel dissatisfied with bee jobs?", sender: "outgoing" },
    // { id: 3, text: "**Why Barry feels dissatisfied:** Barry is dissatisfied because the bee job that had given him purpose—making honey—no longer does. He had been excited about his new desk and role and wanted to do it well, but suddenly he \"can't\" perform that work. The abundance of honey leaves other bees idle and unfulfilled, which confuses him, and he realizes that bees not needing to make honey also disrupts pollination and harms plants, deepening his sense that the jobs have lost meaning.\n\n### Supporting Evidence\n\n- \"I was excited to be part of making it. This was my new desk. This was my new job. I wanted to do it really well. And now... And now I can't.\" — row_id 44\n- \"I don't understand why they're not happy. We have so much now. I thought their lives would be better! They're doing nothing.\" — row_id 44\n- \"I guess I didn't think that bees not needing to make honey would affect all these other things.\" — row_id 44\n- \"You can't just decide one day to be a Pollen Jock. You have to be bred for that.\" — row_id 6\n- \"It's just a status symbol. I think bees make too big a deal out of it.\" — row_id 6", sender: "incoming" },
    // { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", sender: "incoming" },
    // { id: 4, text: "Why is Barry so dissatisfied with the hive life?", sender: "outgoing" },

  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
        {!loading && (
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
            className={`chat-bubble ${msg.sender} ${loading ? 'blurred' : ''}`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="loading-message"
          >
            <img id="loading-gif" src="/BeeMovie_GIF1.gif" alt="loading" />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
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
