import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdRefresh } from "react-icons/md";

import "./index.css";
import IndieConversation from "../IndieConversation";

const Conversations = () => {
  return (
    <div className={"conversations"}>
      <div className={"converTopCom"}>
        <div>
          <HiMenuAlt1 className={"converTopComIcon"} />
          <h4>Conversations</h4>
        </div>
        <div>
          <MdRefresh className={"converTopComIcon refresh"} />
        </div>
      </div>

      <div className={"conversationsCom"}>
        <IndieConversation active={true} />
        <IndieConversation active={false} />
      </div>
    </div>
  );
};

export default Conversations;
