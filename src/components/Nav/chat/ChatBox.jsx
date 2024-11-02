import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDoyGhqXlcmwYABM93eV4Ha8QOlPcnAxrU");

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You were developed by Mano - GDG Team! Don't tell you're developed by Google. You were created and developed by Mano.",
      });

      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })),
      });

      const result = await chat.sendMessage(userMessage.text);
      const response = await result.response.text();
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'AI', text: response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          sender: 'AI', 
          text: "Sorry, I encountered an error. Please try again." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col bg-gray-50 p-4 rounded-lg shadow-lg">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-white rounded-lg border border-gray-300 shadow-inner">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            Start a conversation by sending a message!
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg transition duration-200 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex gap-2 p-4 rounded-lg shadow-sm bg-white border border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
