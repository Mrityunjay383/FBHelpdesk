import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Auth } from "./service";
import Dashboard from "./Pages/Dashboard";
import AuthPage from "./Pages/AuthPage";
import Messages from "./Pages/Messages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({
    user_id: "",
    email: "",
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const valLogin = async () => {
    try {
      const res = await Auth.root();

      if (res.status === 200) {
        await setUserData(res.data.user);
        console.log(`#20245343232735 res.data.user`, res.data.user);
        await setIsLoggedIn(true);
      } else {
        await setUserData({ user_id: "", email: "" });
        await setIsLoggedIn(false);
      }
      setIsDataLoaded(true);
    } catch (err) {
      console.log(`#202321419122932 err`, err);
      await setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    valLogin();
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <div>
          {isDataLoaded && (
            <Routes>
              {/*Home Route have Landing Page */}
              <Route
                path="/"
                element={
                  <div>
                    {isLoggedIn ? (
                      <Dashboard
                        userId={userData.user_id}
                        status={userData.facebook.status}
                        pageName={userData.facebook.page.name}
                      />
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
                      <Messages />
                    ) : (
                      <AuthPage setIsLoggedIn={setIsLoggedIn} />
                    )}
                  </div>
                }
              />
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
