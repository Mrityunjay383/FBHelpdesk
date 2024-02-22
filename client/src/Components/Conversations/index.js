import React, { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdRefresh } from "react-icons/md";

import IndieConversation from "../IndieConversation";

import "./index.css";

const Conversations = ({ conversations, activeConversationId }) => {
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
        {Object.keys(conversations).length > 0 ? (
          Object.keys(conversations).map((conversationId, index) => {
            const conversation = conversations[conversationId];

            return (
              <IndieConversation
                key={index}
                active={activeConversationId === conversation.id}
                conversationDetail={conversation}
              />
            );
          })
        ) : (
          <div className={"indieCom"}>No Conversations yet</div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
