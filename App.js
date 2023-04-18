import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import UploadVideos from "./Admin/UploadVideos";
import VideoList from "./Admin/VideoList";
// import DashBoard from "./Admin/DashBoard";
import Register from "./User/Register";
import Login from "./User/Login";
import Dashboard1 from "./User/Dashboard";
import Favorites from "./User/Favorites";
import History from "./User/History";
import Wishlist from "./User/Wishlist";
import Sidebar from "./Sidebar";

import  { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import Appsub from "./Appsub";
// import "./App.css";

import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config, { botName } from "./chatbot/config";
import DupDash from "./User/DupDash";
import Sidebar1 from "./Admin/Sidebar1";
const App = () => {
  console.log(botName);
  const botName1 = botName;
  const [showPopup, setShowPopup] = useState(false);
  const handleMessage = () => {
    setShowPopup(true);
  };

  const [showBot, toggleBot] = useState(false);
  
  return (
    <React.Fragment>
       <div>
        {showPopup && (
          <div className="chatbot-popup">
            <p>{botName1} How can I be of service?</p>
          </div>
        )}
      </div>
      {showBot && (
        <Fade big>
          <div className="app-chatbot-container">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </Fade>
      )}
      <Flip>
        <button
          className="app-chatbot-button"
          // Window.reload
          onClick={() => toggleBot((prev) => !prev)}
          onMouseOver={handleMessage}
          onMouseOut={() => setShowPopup(false)}
        >
          <div>Bot</div>
          <svg viewBox="0 0 640 512" className="app-chatbot-button-icon">
            <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
          </svg>
        </button>
      </Flip>
      <BrowserRouter>
      {/* <Sidebar> */}
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
      
          {/* <Route path="/admin" element={<DashBoard/>}/> */}
          <Route path="/upload" element={<UploadVideos/>}/>
          <Route path="/list" element={<VideoList/>}/>
          <Route path="/dashboard" element={<Dashboard1/>}/>
          <Route path="/fav" element={<Favorites/>}/>
          <Route path="/his" element={<History/>}/>
          <Route path="/wish" element={<Wishlist/>}/>
          
          <Route path="/dup" element={<DupDash/>}/>
        </Routes>
        {/* </Sidebar> */}
      </BrowserRouter>
      </React.Fragment>
  );
};

export default App;
