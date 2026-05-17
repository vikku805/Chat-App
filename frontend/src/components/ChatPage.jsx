import React from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; 
import axios from "axios";
import { useState, useEffect, useRef } from "react";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = location.state || {};
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);



  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }


  useEffect(() => {
    if (!token || !user) return;

    socket.auth = { token };
    socket.connect();
    socket.emit("addUsers", user.id);
    socket.on("receiveMessage", (msg) => {
      if (
        selectedUser && (msg.senderId === selectedUser.id ||  msg.receiverId === selectedUser.id)
        ) {    
          setMessages((prev) => { if(prev.find((m) => m.id === msg.id)) return prev;  
          return [...prev, msg]
        
        })
        }
     })

    return () => {
      socket.disconnect();
    };
  }, [token, user, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    if (!token) return;
    console.log("Fetching users with token:", token);
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/getUser", {
                 headers: {"auth-token": token// no extra space, no "Bearer " unless backend expects it
},
            });
            console.log("Users fetched:", res.data.users);
            setUsers(res.data.users);
        } catch (error) {
            console.error("Error fetching users -----------:", error);
        } };
        fetchUsers();
    }, [token])
    
    useEffect(() => {
        if (!selectedUser || !token) return;
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/messages/getMessages/${selectedUser.id}`, {
                    headers: {  "auth-token": token // no extra space, no "Bearer " unless backend expects it
   },
                });
                setMessages(res.data.messages || []);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [selectedUser, token]);

    const handleSendMessage =  () => {
        if (!newMessage.trim() || !selectedUser) return;

    const msg = { 
            senderId: user.id,
            receiverId: selectedUser.id,
            text: newMessage
         }
         socket.emit("sendMessage", msg);
            setMessages((prev) => [...prev, { ...msg, id: Date.now() }]);
            setNewMessage("");
        }
  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/4 border-r-2 p-4 bg-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Users</h2>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="space-y-2">
            {users.filter((u) => u.id !== user?.id).map((u) => (
                <div key={u.id} className={`p-3 rounded-lg cursor-pointer  hover-bg-blue transition ${selectedUser?.id === u.id ? "bg-blue-200 font-semibold" : "bg-white"} `} onClick={() => setSelectedUser(u)}>
                    {u.name}
                </div>
            ))}
          </div>
        </div>
        <div className="w-3/4 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto mb-4 p-2 flex flex-col gap-2">
            {selectedUser ? (
                messages.map((m,i) => (
                    <div key={i } className={`p-2 rounded max-w-[60%] ${m.senderId === user?.id ? 'bg-blue-300 self-end' : 'bg-gray-300 self-start'}`}>{m.text}</div>
                ))
            ) : (   
                <div className="text-gray-500 text-center text-xl">welcome,{user?.name} ! <br />
                Select a user to start chatting
                </div>
            )}
            <div ref={messagesEndRef} />


        </div>
        {
            selectedUser && (
                <div className="flex mt-2  gap-3">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder={`Message ${selectedUser.name}...  `} />
                    <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold cursor-pointer">Send</button>
                </div>
        )}
        </div>
      </div>
    </>
  );
}       

export default App;