import React, {createContext,useContext,useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import toast from 'react-hot-toast'

const SocketContext=createContext({
    socket:null,
    messages:[]
})

export const useSocket = () => {
    const context = useContext(SocketContext);
    console.log("context.......",context);
    if(!context){
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}

export const SocketProvider = ({children})=>{
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useSelector(state => state.user);

  useEffect(()=>{
    if(user && user._id){
        const newSocket = io("http://localhost:4005",{
            query:{userId:user._id},
            withCredentials:true,
        })

        newSocket.on("connect",()=>{
            console.log("Connected to server");
            setSocket(newSocket);           
        })

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
            setSocket(null);
        });

        newSocket.on("newMessage", (message) => {
            console.log("New message received:", message);
            setMessages(prevMessages => [...prevMessages, message]);
            toast.success("New message received!");
        });

        setSocket(newSocket); 

      return () => {
        newSocket.disconnect();
      };
    }
  },[user]);

  const value = {
    socket,
    messages,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );

}