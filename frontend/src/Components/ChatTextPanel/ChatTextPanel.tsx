import axios from "axios";
import styles from "./ChatTextPanel.module.css";
import { useEffect } from "react";
import { useState } from "react";
import ChatThread from "../ChatThread/ChatThread";

interface Props {
  currentProfile: object;
  activeHead: object;
}

function ChatTextPanel({ currentProfile, activeHead }: Props) {
  const [chatHeadProfile, setChatHeadProfile] = useState({});
  const [text, setText] = useState("");

  const sendText = (event) => {
    event.preventDefault();
    if (text === "") {
      return;
    }
    axios
      .post("http://localhost:3000/chat/create", {
        sender_id: currentProfile.user_id,
        receiver_id: activeHead.user_id,
        content: text,
      })
      .then((res) => {
        setText("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    event.target.reset();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/getdetails/${activeHead.user_id}`)
      .then((res) => {
        setChatHeadProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    setText("");
  }, [activeHead]);

  return (
    <div id={styles.outerwrapper}>
      <div id={styles.topbar}>
        <div id={styles.topbarContent}>
          <img 
            src={!chatHeadProfile.profile_picture?`./src/assets/${chatHeadProfile["gender"]==="1"?"maleAvatar.png":"femaleAvatar.png"}`:`http://localhost:3000/uploads/${chatHeadProfile.profile_picture}`}
            alt="Pic"
            id={styles.profilepic}
          /> 
          {chatHeadProfile.firstname} {chatHeadProfile.lastname}
        </div>
      </div>
      <div id={styles.chatpanel}>
        <ChatThread currentProfile={currentProfile} activeHead={activeHead} />
      </div>
      <div id={styles.textcreate}>
        <form onSubmit={sendText}>
          <textarea id={styles.textarea} placeholder={text? text : "Type a message"} value={text? text : ""} onChange={(e) => setText(e.target.value)}/>
          <button id={styles.sendbutton} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle cx="25" cy="25" r="25" fill="#c1d1e5" />
              <path
                d="M39.1866 10.3283C39.7784 10.7384 40.089 11.4472 39.9776 12.156L36.2276 36.526C36.1397 37.0942 35.794 37.5922 35.2901 37.8734C34.7861 38.1545 34.1826 38.1897 33.6494 37.9671L26.6415 35.0556L22.6278 39.3965C22.1063 39.9647 21.2859 40.1522 20.5652 39.871C19.8445 39.5898 19.3758 38.8927 19.3758 38.1194V33.222C19.3758 32.9876 19.4636 32.765 19.6219 32.5951L29.4423 21.8806C29.7822 21.5115 29.7704 20.9433 29.4189 20.5918C29.0673 20.2403 28.4989 20.2169 28.1298 20.5508L16.2116 31.1365L11.0377 28.5472C10.4166 28.2367 10.0182 27.6157 10.0006 26.9244C9.98303 26.2332 10.3463 25.5888 10.944 25.2432L37.1944 10.2463C37.8214 9.88892 38.5948 9.92407 39.1866 10.3283Z"
                fill="#2A5FAC"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatTextPanel;