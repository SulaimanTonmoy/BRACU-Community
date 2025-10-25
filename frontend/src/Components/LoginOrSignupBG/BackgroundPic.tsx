import { ReactNode } from "react";
import "./BackgroundPic.css"

interface Props {
    children?: ReactNode;
}

function BackgroundPic( { children }: Props ) {
  return (
    <div className="w-100 main_back">{children}</div>
  )
}

export default BackgroundPic;