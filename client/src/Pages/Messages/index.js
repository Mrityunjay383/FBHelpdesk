import React, { useEffect, useState } from "react";
import { SlCallEnd } from "react-icons/sl";
import { HiMiniUserCircle } from "react-icons/hi2";

import SideBar from "../../Components/SideBar";
import Conversations from "../../Components/Conversations";
import MessagesComponent from "../../Components/MessagesComponent";

import "./index.css";
import { Facebook } from "../../service";

const Messages = ({ socket }) => {
  const [conversations, setConversations] = useState({});
  const [activeConversationName, setActiveConversationName] = useState("");
  const [activeConversationId, setActiveConversationId] = useState("");

  const fetchConversations = async () => {
    const res = await Facebook.conversations();

    if (res.status === 200) {
      const fetchedConversations = res.data.conversations;

      setConversations(fetchedConversations);

      if (Object.keys(fetchedConversations).length > 0) {
        const initialConId = Object.keys(fetchedConversations)[0];
        setActiveConversationName(fetchedConversations[initialConId].name);
        setActiveConversationId(initialConId);
      }
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    socket.on("new_message", (data) => {
      fetchConversations();
    });
  }, [socket]);

  return (
    <div className={"messagesPage"}>
      <SideBar />

      <Conversations
        conversations={conversations}
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
        setActiveConversationName={setActiveConversationName}
      />

      <MessagesComponent
        activeConversationName={activeConversationName}
        activeConversationId={activeConversationId}
        socket={socket}
        fetchConversations={fetchConversations}
      />

      <div className={"details"}>
        <div className={"ProfileCom"}>
          <div className={"imageSec mb-3"}>
            <img src={require("./../../Assets/userImg.png")} alt={"logo"} />
          </div>
          {activeConversationId !== "" && (
            <div className={"nameStatusSec"}>
              <h4>{activeConversationName}</h4>
              <div className={"status"}>
                <div className={"dot"}></div>
                <p>Offline</p>
              </div>
            </div>
          )}
          {activeConversationId !== "" && (
            <div className={"btnSec mt-3"}>
              <button className={"btn"}>
                <SlCallEnd className={"btnIcon"} /> Call
              </button>
              <button className={"btn"}>
                <HiMiniUserCircle className={"btnIcon"} /> Profile
              </button>
            </div>
          )}
        </div>

        {activeConversationId !== "" && (
          <div className={"cusDetailCom"}>
            <h4>Customer details</h4>
            <div className={"delTable"}>
              <div>
                <span>Email</span>
                <span>{"{Can't extract}"}</span>
              </div>
              <div>
                <span>First Name</span>
                <span>
                  {activeConversationName !== "" &&
                    activeConversationName.split(" ")[0]}
                </span>
              </div>
              <div>
                <span>Last Name</span>
                <span>
                  {activeConversationName !== "" &&
                    activeConversationName.split(" ")[1]}
                </span>
              </div>
            </div>
            <p className={"vmdLink"}>View more details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
