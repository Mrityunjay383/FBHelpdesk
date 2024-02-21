import React from "react";

import SideBar from "../../Components/SideBar";
import Conversations from "../../Components/Conversations";

import "./index.css";
import MessagesComponent from "../../Components/MessagesComponent";

const Messages = () => {
  return (
    <div className={"messagesPage"}>
      <SideBar />

      <Conversations />

      <MessagesComponent />

      <div className={"details"}></div>
    </div>
  );
};

export default Messages;
