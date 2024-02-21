import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [pageConnected, setPageConnected] = useState(false);

  return (
    <div className={"dbPage"}>
      <div className={"dbCenterCom"}>
        <h4>Facebook Page Integration</h4>

        {!pageConnected ? (
          <button
            className="btn btn-primary w-100 mt-5 subBtn"
            onClick={() => setPageConnected(true)}
          >
            Connect Page
          </button>
        ) : (
          <div>
            <button className="btn btn-danger w-100 mt-5">
              Delete Integration
            </button>
            <button
              className="btn btn-primary w-100 mt-3 subBtn"
              onClick={() => navigate("/messages")}
            >
              Reply To Messages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
