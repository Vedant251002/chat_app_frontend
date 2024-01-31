import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import io from "socket.io-client";


const Chat = () => {
  const socket = io("http://localhost:6001");
  const [messages, setMessages] = useState([]);
  const me = useSelector((state) => state.user.user);
  const params = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (me) {
      socket.emit('connected-users' , {sender : localStorage.getItem('user') , target : params.id})
      setMessages([])
      socket.on("receive-chat", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      
    }
    return () => {
      socket.disconnect();
    };
  },[params.id ])



  const onSend = () => {
    if(msg.trim() == '' ){
      setMsg('')
      return
    }
    socket.emit("send-chat", { from: me.id, to: params.id, message: msg });
    socket.on("receive-chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg.message]);
    });
    setMsg('')
  };

  return (
    <>
      <div className="bg-gray-700 w-screen flex flex-col justify-between">
        <div className="flex flex-col gap-2 pt-2">
          {messages.length > 0 && me &&
            messages.map((msg, index) => {
              const isSentByMe = msg.from === me.id;

              return (
                <div
                  key={index}
                  className={` flex ${
                    isSentByMe ? "justify-end mr-5" : "justify-start ml-5"
                  } mb-2`}
                >
                  <div
                    className={`${
                      isSentByMe ? "bg-black text-white" : "bg-white text-black"
                    } p-2 rounded-xl`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex sticky gap-5">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Type something ..."
            className="pl-5 w-full ml-5 h-8 rounded-full bg-gray-800 border border-gray-300 border-solid"
          />
          <button onClick={() => onSend()} className="mr-5">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
