import "./MiddleBox.css"
import MiddleBoxRaw from "./MiddleBoxRaw";
import BackgroundPic from "../LoginOrSignupBG/BackgroundPic"

interface Props {
    logo?: string;
    children?: React.ReactNode;
    logo_name?: string;
}

function MiddleBox( { logo, children, logo_name }: Props ) {
  return (
    <>
      <BackgroundPic>
        <MiddleBoxRaw classes="row">
          <div className="col left-box align-items-center">
            <img className="logo mx-auto d-block" src={logo} alt={logo_name} />
          </div>
          <div className="col right-box"> {children} </div>
        </MiddleBoxRaw>
      </BackgroundPic>
    </>
  )
}

export default MiddleBox;