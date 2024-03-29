import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Facebook } from "../../service";
import { toast } from "react-toastify";

const Dashboard = ({ userId, status, pageName, socket }) => {
  const navigate = useNavigate();

  const [fetchedPageName, setFetchedPageName] = useState(pageName);

  const [pageConnected, setPageConnected] = useState(status);

  //creating a new browser window, where facebook authentication will be handled
  const handleFacebookAuth = async () => {
    window.open(
      `${Facebook.uri}?userId=${userId}`,
      "Facebook Login",
      "width=600,height=400"
    );
  };

  useEffect(() => {
    setPageConnected(status);
  }, [status]);

  //Socket useEffect
  useEffect(() => {
    socket.on("auth_done", (data) => {
      toast.success("Facebook Authentication Successful!");
      setPageConnected(true);
      setFetchedPageName(data.pageName);
    });
  }, [socket]);

  const deleteIntegration = async () => {
    const res = await Facebook.deleteIntegration();

    if (res.status === 200) {
      toast.success("Facebook disintegration done");
      setPageConnected(false);
    }
  };

  return (
    <div className={"dbPage"}>
      <div className={"dbCenterCom"}>
        <h4>Facebook Page Integration</h4>

        {!pageConnected ? (
          <button
            className="btn btn-primary w-100 mt-5 subBtn"
            onClick={handleFacebookAuth}
          >
            Connect Page
          </button>
        ) : (
          <div>
            <h5 className={"mt-5"}>
              Integrated Page: {fetchedPageName !== "" && fetchedPageName}
            </h5>
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={deleteIntegration}
            >
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
