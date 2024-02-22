import "./App.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { Auth } from "./service";
import Dashboard from "./Pages/Dashboard";
import AuthPage from "./Pages/AuthPage";
import Messages from "./Pages/Messages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    email: "",
    facebook: {},
  });

  const valLogin = async () => {
    try {
      const res = await Auth.root();

      if (res.status === 200 && res.data && res.data.user) {
        // console.log(`#202453144639237 res.data.user`, res.data.user);

        await setUserData(res.data.user);
        await setIsLoggedIn(true);
      } else {
        await setUserData({ user_id: "", email: "", facebook: {} });
        await setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(`#202321419122932 err`, err);
      await setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    valLogin();
  }, [isLoggedIn]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");

    setSocket(socket);
  }, []);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {isLoggedIn ? (
                    userData.user_id !== "" &&
                    userData.facebook !== {} && (
                      <Dashboard
                        userId={userData.user_id}
                        status={userData.facebook.status}
                        pageName={
                          userData.facebook.page
                            ? userData.facebook.page.name
                            : ""
                        }
                        socket={socket}
                      />
                    )
                  ) : (
                    <AuthPage setIsLoggedIn={setIsLoggedIn} />
                  )}
                </div>
              }
            />
            <Route
              path="/messages"
              element={
                <div>
                  {isLoggedIn ? (
                    <Messages socket={socket} />
                  ) : (
                    <AuthPage setIsLoggedIn={setIsLoggedIn} />
                  )}
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
