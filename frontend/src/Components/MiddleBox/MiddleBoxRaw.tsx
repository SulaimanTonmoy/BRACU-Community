import "./MiddleBox.css";
import BackgroundPic from "../LoginOrSignupBG/BackgroundPic";

interface Props {
  children?: React.ReactNode;
  classes?: string;
  blur?: string;
}

function MiddleBoxRaw({ children, classes, blur = "10px" }: Props) {
  const center_box = {
    width: "60%",
    height: "80vh",
    flexShrink: 0,
    borderRadius: "20px",
    background: "rgba(220, 228, 239, 0.3)",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    backdropFilter: `blur(${blur})`,
  };

  return (
    <BackgroundPic>
      <div className={classes} style={{ ...center_box }}>
        {children}
      </div>
    </BackgroundPic>
  );
}

export default MiddleBoxRaw;
