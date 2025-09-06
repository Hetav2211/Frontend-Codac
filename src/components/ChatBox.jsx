import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

export function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send first AI greeting when chat starts
  useEffect(() => {
    setMessages([
      {
        text: "Hello! How can I assist you today?",
        sender: "ai",
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get AI response (replace with actual API call)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chatbot/chat`,
        { message: inputMessage }
      );

      const aiMessage = {
        text:
          res.data.chatRes ||
          res.data.text ||
          "I didn't understand that. Could you try rephrasing?",
        sender: "ai",
      };
      console.log(aiMessage);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text:
          error.response?.data?.error ||
          "Sorry, I encountered an error. Please try again.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Updated message rendering with Markdown support
  const renderMessage = (text) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat header (unchanged) */}
      <div className="bg-indigo-600 text-white p-4">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </div>

      {/* Messages container */}
      <div
        className={`flex-1 p-4 overflow-y-auto ${
          isDarkMode ? "bg-gray-900/30" : "bg-gray-50/30"
        }`}
      >
        {messages.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-full space-y-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="text-4xl mb-2">🤖</div>
            <p className="text-center">Start a conversation with the AI</p>
            <p className="text-sm text-center opacity-75">
              Ask me anything about coding, programming, or technical concepts!
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-sm">
                  🤖
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 shadow-sm ${
                  message.sender === "user"
                    ? `${
                        isDarkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-500 text-white"
                      } rounded-br-none`
                    : `${
                        isDarkMode
                          ? "bg-gray-800 text-gray-100"
                          : "bg-white text-gray-800"
                      } rounded-bl-none`
                }`}
              >
                <div className="prose prose-sm dark:prose-invert">
                  {renderMessage(message.text)}
                </div>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center ml-2 bg-gradient-to-br from-pink-500 to-orange-500 text-white text-sm">
                  👤
                </div>
              )}
            </div>
          ))
        )}
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-sm">
              🤖
            </div>
            <div
              className={`rounded-2xl px-4 py-2 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode ? "bg-gray-400" : "bg-gray-500"
                  } animate-bounce`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode ? "bg-gray-400" : "bg-gray-500"
                  } animate-bounce delay-100`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode ? "bg-gray-400" : "bg-gray-500"
                  } animate-bounce delay-200`}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area (unchanged) */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-500"
                : "bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200 focus:ring-indigo-500"
            }`}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 
              ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              } text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            Send {!isLoading && "✨"}
          </button>
        </div>
      </div>
    </div>
  );
}
