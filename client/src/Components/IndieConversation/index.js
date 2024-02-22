import React from "react";

const IndieConversation = ({ active, conversationDetail }) => {
  const formatTimestamp = (timestamp) => {
    timestamp -= 1000;

    const date = new Date(timestamp);

    // Getting the current time
    const currentTime = new Date();

    // Calculating the time difference in milliseconds
    const timeDifference = currentTime - date;

    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes > 59) {
      // If the time difference is greater than 59 minutes, returning actual time in hh:mm format
      return date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (minutes > 1440) {
      // If the time difference is greater than 24 hours (1440 minutes), returning "yesterday"
      return "yesterday";
    } else {
      return `${minutes.toString()}m`;
    }
  };

  return (
    <div className={`indieCom ${active && "active"}`}>
      <div className={"firstLine"}>
        <div className={"leftCom"}>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" />
          </div>
          <div className={"nameCat"}>
            <span>{conversationDetail.name}</span>
            <span>Facebook DM</span>
          </div>
        </div>

        <div className={"time"}>
          {formatTimestamp(conversationDetail.lastMessage.timestamp)}
        </div>
      </div>
      <div className={"txtCom"}>
        <p>{conversationDetail.lastMessage.message}</p>
      </div>
    </div>
  );
};

export default IndieConversation;
