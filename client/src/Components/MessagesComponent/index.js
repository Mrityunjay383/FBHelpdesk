import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

import "./index.css";
import { Facebook } from "../../service";

const timestampToFormattedDate = (timestamp) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Adjust hours for 12-hour format
  const formattedHours = hours % 12 || 12;

  // Pad single-digit minutes with a leading zero
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Assemble the formatted date and time string
  return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${ampm}`;
};

const MessagesComponent = ({
  activeConversationName,
  activeConversationId,
  socket,
  fetchConversations,
}) => {
  const [messages, setMessages] = useState([]);

  const fetchConversation = async () => {
    const res = await Facebook.indieConversation({
      conversationId: activeConversationId,
    });

    if (res.status === 200) {
      setMessages(res.data.messages || []);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [activeConversationId]);

  useEffect(() => {
    socket.on("new_message", (data) => {
      if (data.id == activeConversationId) {
        setMessages((curr) => {
          return [...curr, data.newMessage];
        });
      }
    });
  }, [socket, activeConversationId]);

  const MessageLine = ({ message }) => {
    return (
      <span
        style={
          message.type === "sent"
            ? {
                alignSelf: "flex-end",
                background: "#1E4D91",
                color: "#fff",
              }
            : { alignSelf: "flex-start" }
        }
      >
        {message.message}
      </span>
    );
  };

  const TimePara = ({ message }) => {
    return (
      <p
        style={
          message.type === "sent"
            ? { marginTop: "0" }
            : { alignSelf: "flex-start" }
        }
      >
        {message.type === "sent"
          ? "Richard panel - "
          : `${activeConversationName} - `}
        {timestampToFormattedDate(message.timestamp)}
      </p>
    );
  };

  const sendMessage = async (messageText) => {
    const newMessage = {
      message: messageText,
      timestamp: new Date().getTime(),
      type: "sent",
    };

    const res = await Facebook.sendMessage({
      newMessage,
      conversationId: activeConversationId,
    });

    if (res.status === 200) {
      setMessages((curr) => {
        return [...curr, newMessage];
      });

      fetchConversations();
    }
  };

  function scrollToBottom() {
    const messageBox = document.getElementById("messageBox");
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={"messages"}>
      <div className={"topRow"}>{activeConversationName}</div>

      <div className={"mainCom"}>
        <div id="messageBox" className={"messagesList"}>
          {messages.map((message, index) => {
            const nextMessage = messages[index + 1];

            if (index !== messages.length - 1) {
              if (nextMessage.type !== message.type) {
                return (
                  <div
                    key={index}
                    style={
                      message.type === "sent"
                        ? {
                            alignSelf: "flex-end",
                            display: "flex",
                            flexDirection: "column",
                          }
                        : { alignSelf: "flex-start" }
                    }
                  >
                    <MessageLine message={message} />
                    <TimePara message={message} />
                  </div>
                );
              }

              return <MessageLine key={index} message={message} />;
            } else {
              return (
                <div
                  key={index}
                  style={
                    message.type === "sent"
                      ? {
                          alignSelf: "flex-end",
                          display: "flex",
                          flexDirection: "column",
                        }
                      : { alignSelf: "flex-start" }
                  }
                >
                  <MessageLine message={message} />
                  <TimePara message={message} />
                </div>
              );
            }
          })}
        </div>
        <div className={"messageInp"}>
          <input
            type="text"
            className="form-control"
            placeholder={`Message ${activeConversationName}`}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <div className={"btn"}>
            <IoSendSharp className={"sendIcon"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
