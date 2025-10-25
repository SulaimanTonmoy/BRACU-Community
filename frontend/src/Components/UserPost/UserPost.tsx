// need to work on comment section
// need to link to profile page

import "./UserPost.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router';
import Comment from "../Comment/Comment";
import axios from "axios";

interface Props {
  details: object;
  currentProfile: object;
}

function UserPost({ details, currentProfile }: Props) {
  const [likeGiven, setLikeGiven] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const [commentCnt, setCommentCnt] = useState(0);
  const navigate = useNavigate();
  const commentRef = useRef(null);
  const handleClick = () => {
    navigate("/profile", { state: { currentProfile: currentProfile, targetProfile: currentProfile } })
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3000/comment/getall/${details["post_id"]}`)
      .then((res) => {
        setAllComments(res.data);
        setCommentCnt(res.data.length);
      })
      .catch((err) => console.log(err));
  }, [commentText]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/likecount/${details["post_id"]}`)
      .then((res) => {
        setLikeCount(parseInt(res.data.likecount));
      })
      .catch((err) => console.log(err));
  }, [likeGiven]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/getsharecount/${details["post_id"]}`)
      .then((res) => {
        setShareCount(parseInt(res.data.sharecount));
      })
      .catch((err) => console.log(err));
  }, [isShared]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/post/isliked/${details["post_id"]}/${currentProfile["user_id"]}`
      )
      .then((res) => {
        if (res.data.length > 0) setLikeGiven(true);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `http://localhost:3000/post/isshared/${details["post_id"]}/${currentProfile["user_id"]}`
      )
      .then((r) => {
        if (r.data.length > 0) setIsShared(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleReaction = () => {
    axios
      .post(`http://localhost:3000/post/${likeGiven ? "unlike" : "like"}`, {
        user_id: currentProfile["user_id"],
        post_id: details["post_id"],
      })
      .then((res) => {
        console.log("Success:", res.data.msg);
        setLikeGiven(!likeGiven);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleComment = (evt) => {
    evt.preventDefault();
    commentRef.current.focus();
  };

  const handleShare = () => {
    // if clicked, include the post in currentProfile's sharedPosts
    axios
      .post(
        `http://localhost:3000/post/${
          !isShared ? "share" : "unshare"
        }`,
        {
          user_id: currentProfile["user_id"],
          post_id: details["post_id"],
        }
      )
      .then((res) => {
        console.log("Success:", res.data.msg);
        setIsShared(!isShared);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const commentSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/comment/create", {
        content: commentText,
        user_id: currentProfile["user_id"],
        post_id: details["post_id"],
      })
      .then((res) => {
        console.log("Success:", res.data.msg);
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    event.target.reset();
  };

  return (
    <>
      <div className="user-post">
        <div className="row">
          {/* user pic */}
          <button
            className="col-1 picButton"
            onClick={() => console.log("Pic")}
          >
          <img
            src={!details.creator.profilePicture?`./src/assets/${details.creator["gender"]==="1"?"maleAvatar.png":"femaleAvatar.png"}`:`http://localhost:3000/uploads/${details.creator.profilePicture}`}
            alt="Profile"
            className="ProfileStyle"
          />
          </button>

          {/* Username and Timestamp*/}
          <div
            className="col-11"
            style={{ marginLeft: "10px", marginRight: "-10px" }}
            onClick={() => console.log("Name")}
          >
            <button className="creator_name nameButton" onClick={() => handleClick()}>
              {details.creator["firstname"] + " " + details.creator["lastname"]}
            </button>
            <p className="timestamp_text">
              {details.timestamp.slice(8, 10)}-{details.timestamp.slice(5, 7)}-
              {details.timestamp.slice(0, 4)}, {details.timestamp.slice(11, 16)}
            </p>
          </div>

          {/* Post content */}
          <div className="col postContent">
            {details.content.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Like, Comment, Share */}
          <div className="col-12">
            <div className="bar"></div>
            <div className="row">
              <button className="col reactionIcon" onClick={handleReaction}>
                {likeGiven ? (
                  <svg
                    height="2.02em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                  </svg>
                ) : (
                  <svg
                    height="2.02em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                  </svg>
                )}
                <div className="count">{likeCount}</div>
              </button>

              <button
                className="col reactionIcon"
                onClick={(e) => handleComment(e)}
              >
                <svg
                  height="2.05em"
                  viewBox="0 0 512 512"
                >
                  <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                </svg>
                <div className="count">{commentCnt}</div>
              </button>

              <button className="col reactionIcon" onClick={handleShare}>
                <svg
                  height="1.95em"
                  viewBox="0 0 576 512"
                >
                  {!isShared? <path d="M400 255.4V240 208c0-8.8-7.2-16-16-16H352 336 289.5c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112h48 16 32c8.8 0 16-7.2 16-16V80 64.6L506 160 400 255.4zM336 240h16v48c0 17.7 14.3 32 32 32h3.7c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7V80H336 304 288c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4h2.5c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5l0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5H304h32zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" />:
                  <path d="M 352 224 H 305.5 c -45 0 -81.5 36.5 -81.5 81.5 c 0 22.3 10.3 34.3 19.2 40.5 c 6.8 4.7 12.8 12 12.8 20.3 c 0 9.8 -8 17.8 -17.8 17.8 h -2.5 c -2.4 0 -4.8 -0.4 -7.1 -1.4 C 210.8 374.8 128 333.4 128 240 c 0 -79.5 64.5 -144 144 -144 h 80 V 34.7 C 352 15.5 367.5 0 386.7 0 c 8.6 0 16.8 3.2 23.2 8.9 L 548.1 133.3 c 7.6 6.8 11.9 16.5 11.9 26.7 s -4.3 19.9 -11.9 26.7 l -139 125.1 c -5.9 5.3 -13.5 8.2 -21.4 8.2 H 384 c -17.7 0 -32 -14.3 -32 -32 V 224 z z M -67 92 z z M 72 32 C 32.2 32 0 64.2 0 104 V 440 c 0 39.8 32.2 72 72 72 H 408 c 39.8 0 72 -32.2 72 -72 V 376 c 0 -13.3 -10.7 -24 -24 -24 s -24 10.7 -24 24 v 64 c 0 13.3 -10.7 24 -24 24 H 72 c -13.3 0 -24 -10.7 -24 -24 V 104 c 0 -13.3 10.7 -24 24 -24 h 64 c 13.3 0 24 -10.7 24 -24 s -10.7 -24 -24 -24 H 72 z"/>}
                </svg>
                <div className="count">{shareCount}</div>
              </button>
            </div>
            <div className="bar" style={{ marginBottom: "25px" }}></div>
          </div>

          {/* All comments */}
          {allComments.map((item, index) => {
            return (
              <Comment
                key={index}
                allDetails={item}
                currentProfile={currentProfile}
              />
            );
          })}

          {/* Posting a new comment */}
          <form
            onSubmit={commentSubmit}
            className="row"
            style={{ paddingRight: "0px" }}
          >
            <div className="col-1 picButton">
              <img
                src={!currentProfile.profile_picture?`./src/assets/${currentProfile["gender"]==="1"?"maleAvatar.png":"femaleAvatar.png"}`:`http://localhost:3000/uploads/${currentProfile.profile_picture}`}
                alt="Profile"
                className="ProfileStyleSmall"
              />
            </div>
            <div className="col-10">
              <textarea
                className="form-control"
                name="commentText"
                id="commentText"
                cols="30"
                rows="1"
                ref={commentRef}
                placeholder="Write a comment... "
                onKeyDown={(event) =>
                  event.key === "Enter" ? event.stopPropagation() : null
                }
                onChange={(event) => setCommentText(event.target.value)}
                required
              />
            </div>

            <div className="col-1">
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <circle cx="25" cy="25" r="25" fill="#8CA1BD" />
                  <path
                    d="M39.1866 10.3283C39.7784 10.7384 40.089 11.4472 39.9776 12.156L36.2276 36.526C36.1397 37.0942 35.794 37.5922 35.2901 37.8734C34.7861 38.1545 34.1826 38.1897 33.6494 37.9671L26.6415 35.0556L22.6278 39.3965C22.1063 39.9647 21.2859 40.1522 20.5652 39.871C19.8445 39.5898 19.3758 38.8927 19.3758 38.1194V33.222C19.3758 32.9876 19.4636 32.765 19.6219 32.5951L29.4423 21.8806C29.7822 21.5115 29.7704 20.9433 29.4189 20.5918C29.0673 20.2403 28.4989 20.2169 28.1298 20.5508L16.2116 31.1365L11.0377 28.5472C10.4166 28.2367 10.0182 27.6157 10.0006 26.9244C9.98303 26.2332 10.3463 25.5888 10.944 25.2432L37.1944 10.2463C37.8214 9.88892 38.5948 9.92407 39.1866 10.3283Z"
                    fill="#2A5FAC"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserPost;