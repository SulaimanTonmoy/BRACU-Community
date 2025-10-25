import styles from "./ChatThread.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Props {
  currentProfile: object;
  activeHead: object;
}

function ChatThread({ activeHead, currentProfile }: Props) {
  const [chats, setChats] = useState([]);
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/chat/get-chats/${currentProfile.user_id}/${activeHead.user_id}`
      )
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:3000/user/getdetails/${activeHead.user_id}`)
      .then((res) => {
        setOtherUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeHead]);

  console.log(otherUser);

  return (
    <div>
      {chats.map((chat: object, index) => {
        return (
          <div key={index}>
            {chat.content === "" ? (
              <></>
            ) : (
              <div className={styles.oneThread}>
                {chat.send_user_id === currentProfile.user_id ? (
                  <div className={styles.myText}>
                    <img
                      src={
                        !currentProfile.profile_picture
                          ? `./src/assets/${
                              currentProfile["gender"] === "1"
                                ? "maleAvatar.png"
                                : "femaleAvatar.png"
                            }`
                          : `http://localhost:3000/uploads/${currentProfile.profile_picture}`
                      }
                      className={styles.threadPic}
                      alt=""
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      {currentProfile.firstname} {currentProfile.lastname}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {chat.time_stamp.slice(8, 10)}-{chat.time_stamp.slice(5, 7)}
                    -{chat.time_stamp.slice(0, 4)},{" "}
                    {chat.time_stamp.slice(11, 16)}
                    <br />
                    <div className={styles.chatContent}>{chat.content}</div>
                  </div>
                ) : (
                  <div className={styles.otherText}>
                    <img
                      src={
                        !otherUser.profile_picture
                          ? `./src/assets/${
                              otherUser["gender"] === "1"
                                ? "maleAvatar.png"
                                : "femaleAvatar.png"
                            }`
                          : `http://localhost:3000/uploads/${otherUser.profile_picture}`
                      }
                      className={styles.threadPic}
                      alt=""
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      {otherUser.firstname} {otherUser.lastname}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {chat.time_stamp.slice(8, 10)}-{chat.time_stamp.slice(5, 7)}
                    -{chat.time_stamp.slice(0, 4)},{" "}
                    {chat.time_stamp.slice(11, 16)}
                    <br />
                    <div className={styles.chatContent}>{chat.content}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatThread;
