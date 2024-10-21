import React, { useEffect, useState } from "react";
import InstructorSidebar from "../../../components/instrcture/InstructorSidebar";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4005");

const InstructorChat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log("Chat History", chatHistory);
    socket.on("receive_message", (data) => {
      console.log("Receive message for instuctore data:", data);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { message: data.message, sender: "Student" },
      ]);
    });
  }, [chatHistory]);

  const sendMessage = () => {
    console.log("Receive message for instuctore message:", message);
    if (message.trim()) {
      socket.emit("send_message", { message });
      setChatHistory([...chatHistory, { message, sender: "Instructor" }]);
      setMessage("");
    }
  };

  return (
    <div className="lg:flex">
      <InstructorSidebar />
      <div className="flex-grow h-screen p-6 bg-gray-300 lg:ml-64 flex flex-col">
        <h2 className="text-3xl font-semibold mb-6">Instructor Chat</h2>

        <div className="flex-grow h-screen p-6 rounded-lg bg-white flex flex-col">
          <div className="flex-grow bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
            <div className="grid lg:grid-cols-[230px,1fr] h-screen max-h-screen">
              <section className="bg-blue-100">Side Bar</section>
              <div className="flex-grow mb-4 overflow-y-auto bg-red-100">
                {chatHistory.length > 0 ? (
                  chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-lg ml-2  ${
                        chat.sender === "Instructor"
                          ? "bg-blue-100 self-end"
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
        </div>
      </div>
    </div>
  );
};

export default InstructorChat;
