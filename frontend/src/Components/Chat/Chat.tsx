import "./Chat.css";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import ChatHead from "../ChatHead/ChatHead";
import ChatTextPanel from "../ChatTextPanel/ChatTextPanel";

function Chat() {
  const location = useLocation();
  const [chatHeads, setChatHeads] = useState([]);
  const [activeHead, setActiveHead] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chat/get-chat-heads/${location.state.currentProfile.user_id}`)
      .then((res) => {
        setChatHeads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeHead]);

  return (
    <>
      <Navbar currentProfile={location.state.currentProfile} />
      <div className="row" id="outer-wrapper">
        <div className="col-3" id="left-panel">
          {
            chatHeads.map((chatHead: object, index) => {
              return <ChatHead currentProfile={location.state.currentProfile} chatHead={chatHead} setActiveHead={setActiveHead} key={index} />;
            })
          }
        </div>
        <div className="col-9" id="right-panel">
          {
            activeHead ? <ChatTextPanel currentProfile={location.state.currentProfile} activeHead={activeHead} /> : <div id="chatnotactive">Click on a chat to start</div>
          }
        </div>
      </div>
    </>
  );
}

export default Chat;
