import React from "react";
import { SlCallEnd } from "react-icons/sl";
import { HiMiniUserCircle } from "react-icons/hi2";

import SideBar from "../../Components/SideBar";
import Conversations from "../../Components/Conversations";
import MessagesComponent from "../../Components/MessagesComponent";

import "./index.css";

const Messages = () => {
  return (
    <div className={"messagesPage"}>
      <SideBar />

      <Conversations />

      <MessagesComponent />

      <div className={"details"}>
        <div className={"ProfileCom"}>
          <div className={"imageSec mb-3"}>
            <img src={require("./../../Assets/userImg.png")} alt={"logo"} />
          </div>
          <div className={"nameStatusSec"}>
            <h4>Amit RG</h4>
            <div className={"status"}>
              <div className={"dot"}></div>
              <p>Offline</p>
            </div>
          </div>
          <div className={"btnSec mt-3"}>
            <button className={"btn"}>
              <SlCallEnd className={"btnIcon"} /> Call
            </button>
            <button className={"btn"}>
              <HiMiniUserCircle className={"btnIcon"} /> Profile
            </button>
          </div>
        </div>

        <div className={"cusDetailCom"}>
          <h4>Customer details</h4>
          <div className={"delTable"}>
            <div>
              <span>Email</span>
              <span>amit@richpanel.com</span>
            </div>
            <div>
              <span>First Name</span>
              <span>Amit</span>
            </div>
            <div>
              <span>Last Name</span>
              <span>RG</span>
            </div>
          </div>
          <p className={"vmdLink"}>View more details</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
