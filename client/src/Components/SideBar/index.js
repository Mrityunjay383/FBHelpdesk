import React from "react";
import { FaInbox } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoMdTrendingUp } from "react-icons/io";

import "./index.css";

const SideBar = () => {
  return (
    <div className={"sidebar"}>
      <div className={"sbTop"}>
        <img src={require("./../../Assets/logo.png")} alt={"logo"} />
        <div className={"sbTopIconCom active"}>
          <FaInbox className={"sbTopIcon"} />
        </div>
        <div className={"sbTopIconCom"}>
          <HiUsers className={"sbTopIcon"} />
        </div>
        <div className={"sbTopIconCom"}>
          <IoMdTrendingUp className={"sbTopIcon"} />
        </div>
      </div>
      <div className={"sbBottom"}>
        <img src={require("./../../Assets/userImg.png")} alt={"logo"} />
        <div className={"greenDot"}></div>
      </div>
    </div>
  );
};

export default SideBar;
