import { useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router";

interface Props {
  currentProfile?: object;
  onSearch?: (searchString: string) => void;
  searchBarText?: string;
  setSearchBarText?: (searchString: string) => void;
}

function Navbar( {currentProfile = location.state.currentProfile, onSearch, searchBarText, setSearchBarText}: Props ) {
  const SearchBarStyle = {
    width: "400px",
    height: "40px",
    borderRadius: "35px",
    background: "#EEE",
    fontSize: "20px",
    padding: "0px 10px 0px 18px",
    margin: "13px 0px 13px 0px",
  };

  const navigate = useNavigate();
  const location = useLocation();

  // const handleSubmit = (searchStr : string) => {
  //   onSearch!(searchStr);
  //   console.log(searchStr + " submitted in form ✅");
  // };

  // useEffect(() => {
  //   const keyDownHandler = (event: any) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       handleSubmit(event.target.value);
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, [searchBarText]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ background: "#9BB1CB", height: "70px" }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <button className="navbar-brand" style={{marginRight: "25%"}} onClick={() => navigate("/home", {state: location.state.currentProfile})}>
            <img src="./src/assets/Logo.png" alt="Logo" />
          </button>

          {/* Collapse button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Search Bar */}
          <div
            id="navbarSupportedContent"
            className="collapse navbar-collapse"
          >
            {/* <form role="search"> */}
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Users..."
              aria-label="Search"
              id="searchBarText"
              name="searchBarText"
              onChange={(event) => setSearchBarText!(event.target.value)}
              style={SearchBarStyle}
            />
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            {/* </form> */}
          </div>

          {/* Profile and Chat*/}
          <div
            id="navbarSupportedContent"
            className="collapse navbar-collapse"
            style={{ justifyContent: "right", width: "50px" }}
          >
            <div style={{marginRight: "15px"}}> {/* Chat */}
              <button className="navbar" onClick={() => navigate('/chat', {state: {currentProfile: currentProfile}})}>
                <img
                  src="./src/assets/Chat_icon.png"
                  alt="Profile"
                  className="ProfileStyle"
                />            
              </button>
            </div>
            <div> {/* Profile */}
              <button className="navbar" onClick={() => navigate('/profile', {state: {currentProfile: currentProfile, targetProfile: currentProfile}})} onDoubleClick={() => navigate('/')}>
                <img
                  src={!currentProfile.profile_picture?`./src/assets/${currentProfile["gender"]==="1"?"maleAvatar.png":"femaleAvatar.png"}`:`http://localhost:3000/uploads/${currentProfile.profile_picture}`}
                  alt="Profile"
                  className="ProfileStyle"
                />
                
                <div className="DownArrow">V</div>
                
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
