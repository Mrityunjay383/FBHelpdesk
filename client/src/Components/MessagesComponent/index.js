import React from "react";
import { IoSendSharp } from "react-icons/io5";

import "./index.css";

const messages = [
  {
    type: "received",
    text: "Is it in stock right now?",
  },
  {
    type: "received",
    text: "I want to buy",
  },
  {
    type: "receiveTime",
    timestamp: 1708482817000,
  },
  {
    type: "sent",
    text: "We have 3 left in stock!",
  },
  {
    type: "sent",
    text: "If you order before 8PM we can ship it today",
  },
  {
    type: "sentTime",
    timestamp: 1708483723000,
  },
];

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

const MessagesComponent = () => {
  return (
    <div className={"messages"}>
      <div className={"topRow"}>Amit RG</div>

      <div className={"mainCom"}>
        <div className={"messagesList"}>
          {messages.map((message) => {
            return message.type === "sent" || message.type === "received" ? (
              <span
                style={
                  message.type.includes("sent")
                    ? {
                        alignSelf: "flex-end",
                        background: "#1E4D91",
                        color: "#fff",
                      }
                    : { alignSelf: "flex-start" }
                }
              >
                {message.text}
              </span>
            ) : (
              <p
                style={
                  message.type.includes("sent")
                    ? { alignSelf: "flex-end" }
                    : { alignSelf: "flex-start" }
                }
              >
                {message.type.includes("sent")
                  ? "Richard panel - "
                  : "Username - "}
                {timestampToFormattedDate(message.timestamp)}
              </p>
            );
          })}
        </div>
        <div className={"messageInp"}>
          <input
            type="text"
            className="form-control"
            placeholder={"Message Amit RG"}
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
