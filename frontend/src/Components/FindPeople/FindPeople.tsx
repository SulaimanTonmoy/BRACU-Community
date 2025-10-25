// need to link to profile page

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./FindPeople.css"
import axios from "axios";

interface Props {
    allDetails: object;
    currentProfile: object;
}

function FindPeople({allDetails, currentProfile}: Props) {

  const [mutual, setMutual] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/user/getmutualcount/${allDetails.user_id}/${currentProfile.user_id}`).then(res => setMutual(res.data.mutual)).catch(err => console.log(err));
  }, [mutual])

  const handleClick = () => {
    navigate("/profile", { state: { currentProfile: currentProfile, targetProfile: allDetails } })
  }
  return (
    <>
      <button className="main_btn" onClick={handleClick}>
        <div className="card_main">
          <div className="row" style={{ margin: 0 }}>

            <div className="col-3">
              {
                allDetails["gender"] === '1' ?
                <img src="./src/assets/maleAvatar.png" alt="Profile Picture" className="profile_pic" /> :
                <img src="./src/assets/femaleAvatar.png" alt="Profile Picture" className="profile_pic" />
              }
            </div>

            <div className="col-9" style={{ marginLeft: "10px", marginRight: "-10px" }}>
              <h4 className="name">{allDetails["firstname"] + " " + allDetails["lastname"]}</h4>
              {
                allDetails["email"].includes("g.bracu.ac.bd") ?
                <p className="designation">Student</p>:
                <p className="designation">Faculty</p>
              }
              <p className="mutual">{mutual > 0?`(${mutual} mutual)`:"(No mutual)"}</p>
            </div>    

          </div>
        </div>
      </button>
    </>
  )
}

export default FindPeople;