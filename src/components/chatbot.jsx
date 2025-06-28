import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown"; // 📦 npm install react-markdown
import remarkGfm from "remark-gfm"; // 📦 npm install remark-gfm

export default function ChatBot({ externalMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (externalMessage) {
      const formatted = externalMessage.replace(/([.?!])\s*/g, "$1\n");
      setMessages((prev) => [...prev, { role: "ai", content: formatted }]);
    }
  }, [externalMessage]);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      // Preprocess the reply to break lines after each sentence
      const formattedReply = data.reply.replace(/([.?!])\s*/g, "$1\n");

      setMessages((prev) => [...prev, { role: "ai", content: formattedReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Error connecting to AI server." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-[beige] rounded-lg p-3 shadow-md h-[400px] text-black">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 flex flex-col pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-md text-sm break-words cursor-pointer ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-100 self-start text-left"
            }`}
            onClick={() => msg.role === "ai" && openModal(msg.content)}
          >
            {msg.content.length > 120
              ? msg.content.slice(0, 120) + "..."
              : msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <div className="flex gap-2 items-start">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Ask a finance-related question..."
          className="flex-1 resize-none p-2 rounded-md border border-gray-300 focus:outline-none max-h-[80px] overflow-y-auto"
        />
        <button
          onClick={sendMessage}
          className="bg-[#0b1a55] hover:bg-[#0a174d] text-white px-2 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          ╰┈➤
        </button>
      </div>

      {/* Full answer Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto shadow-xl text-black relative">
            <button
              className="absolute top-2 right-3 text-gray-700 hover:text-red-500 text-xl"
              onClick={closeModal}
            >
              ❌
            </button>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-sm mt-2 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-5 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li {...props} />,
              }}
            >
              {modalContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
