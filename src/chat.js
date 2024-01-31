import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import io from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const me = useSelector((state) => state.user.user);
  const params = useParams();
  const [msg, setMsg] = useState("");
  const socket = io("http://localhost:6001");

  useEffect(() => {
    if (me) {
      getData();
      socket.on("chat", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:6001/target_user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId: me.id, targetUser: +params.id }),
      });
      if (!response.ok) {
        throw new Error("could not get users messages");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSend = () => {
    socket.emit("chat", { from: me.id, to: params.id, message: msg });
    socket.on("chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
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
