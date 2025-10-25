import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import UserProfile from "./Components/UserProfile/UserProfile";
import Chat from "./Components/Chat/Chat";
// import Verify from "./Components/Verify/Verify";


function App() {
  return (
    <Routes>
        <Route path="/" element={ <Login /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/signup" element={ <Signup /> }></Route>
        <Route path="/home" element={ <Newsfeed /> }></Route>
        {/* <Route path="/verify" element={ <Verify /> }></Route> */}
        <Route path="/profile" element={ <UserProfile /> }></Route>
        {/* <Route path="/profile" element={ <Newsfeed /> }></Route> (Yet to implement) */}
        <Route path="/chat" element={ <Chat /> }></Route>
    </Routes>
  );
}

export default App;
