import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import "./Newsfeed.css";
import FindPeople from "../FindPeople/FindPeople";
import { useLocation } from "react-router";
import StatusBox from "../StatusBox/StatusBox";
import UserPost from "../UserPost/UserPost";
import axios from "axios";

function Newsfeed() {
  const location = useLocation();
  const [usrData, setUsrData] = useState([]);
  const [usrPost, setUsrPost] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [statusText, setStatusText] = useState("");

  const usrSearch = (searchStr: string) => {
    if (searchStr === "") {
      axios
        .get(
          `http://localhost:3000/user/getrandomusers/10/${location.state.user_id}`
        )
        .then((res) => {
          setUsrData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `http://localhost:3000/user/getmatchedusers/50/${location.state.user_id}/${searchStr}`
        )
        .then((res) => {
          setUsrData(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    usrSearch(searchBarText);
  }, [searchBarText]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/post/getallnewsfeed/${location.state.user_id}`
      )
      .then((res) => {
        setUsrPost(res.data);
      });
  }, [statusText]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/user/getrandomusers/10/${location.state.user_id}`
      )
      .then((res) => {
        setUsrData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="external_wrapper">
        <Navbar
          currentProfile={location.state}
          onSearch={usrSearch}
          setSearchBarText={setSearchBarText}
          searchBarText={searchBarText}
        />
        <div className="row" style={{ margin: 0 }}>
          <div className="col-3 wrapping_div left_panel">
            {/* Left panel. Find people option will be here */}
            <h3 className="find_people">Find People</h3>

            {/* <FindPeople allDetails = {user details} currentProfile = {location.state}/> */}
            {usrData.map((item, index) => {
              return (
                <FindPeople
                  key={index}
                  allDetails={item}
                  currentProfile={location.state}
                />
              );
            })}
          </div>

          <div className="col-6 wrapping_div middle_panel">
            {/* Middle panel. Posts will be here */}
            <StatusBox currentProfile={location.state} statusText={statusText} setStatusText={setStatusText}/>

            {usrPost.map((item, index) => (
              <UserPost
                key={index}
                details={{
                  post_id: item.post_id,
                  content: item.content,
                  timestamp: item.time_stamp,
                  creator: {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    gender: item.gender,
                    profilePicture: item.profile_picture,
                  },
                }}
                currentProfile={location.state}
              />
            ))}
          </div>

          <div className="col-3 wrapping_div right_panel">
            {/* Right panel. Advertisements will be here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsfeed;
