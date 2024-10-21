import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4005");

const UserChat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log("chatHistory..",chatHistory);
    socket.on("receive_message", (data) => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: data.message, sender: "Instructor" },
      ]);
    });
  }, [chatHistory]);

  const sendMessage = () => {
    console.log("User send message",message);
    
    if (message.trim()) {
      socket.emit("send_message", { message });
      setChatHistory([...chatHistory, { message, sender: "Student" }]);
      setMessage("");
    }
  };

  return (
    <div className="flex-grow h-screen p-6 rounded-lg  bg-gray-100 flex flex-col">
      <div className="flex-grow mb-4 overflow-y-auto">
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                chat.sender === "Student"
                  ? "bg-green-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              <p className="text-sm">
                {chat.sender}: {chat.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
      </div>

      <div className="flex items-center border-t p-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={sendMessage}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
