import React from "react";

const IndieConversation = ({ active }) => {
  return (
    <div className={`indieCom ${active && "active"}`}>
      <div className={"firstLine"}>
        <div className={"leftCom"}>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" />
          </div>
          <div className={"nameCat"}>
            <span>Amit RG</span>
            <span>Facebook DM</span>
          </div>
        </div>

        <div className={"time"}>10m</div>
      </div>
      <div className={"txtCom"}>
        <p>Awesome Product</p>
        <p>Hey There! I probably did one of the best product...</p>
      </div>
    </div>
  );
};

export default IndieConversation;
