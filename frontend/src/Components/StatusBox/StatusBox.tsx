import axios from "axios";
import "./StatusBox.css";

interface Props {
  currentProfile: object;
  statusText: string;
  setStatusText: Function;
}

function StatusBox({ currentProfile, statusText, setStatusText }: Props) {

  const submitStatus = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/post/createnew", {
        user_id: currentProfile["user_id"],
        content: statusText,
      })
      .then((res) => {
        console.log("Success:", res.data.msg);
        setStatusText("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    event.target.reset();
  };

  return (
    <>
      <form onSubmit={event => submitStatus(event)}>
        <div className="outer">
          <div className="row">
            <div className="col-1">
              <img
                src={!currentProfile.profile_picture?`./src/assets/${currentProfile["gender"]==="1"?"maleAvatar.png":"femaleAvatar.png"}`:`http://localhost:3000/uploads/${currentProfile.profile_picture}`}
                alt="Profile"
                className="ProfileStyle"
              />
            </div>

            <div className="col">
              <textarea
                className="form-control"
                name="statusText"
                id="statusText"
                cols="30"
                rows="3"
                placeholder="Share your thoughts..."
                onChange={(e) => setStatusText(e.target.value)}
                onKeyUp={(event) =>
                  event.key === "Enter"
                    ? event.stopPropagation()
                    : console.log(event.key)
                }
              ></textarea>
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
          </div>
        </div>
      </form>
    </>
  );
}

export default StatusBox;
