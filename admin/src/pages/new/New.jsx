import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";


const API = process.env.REACT_APP_API_URL;

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

//   
const handleClick = async (e) => {
  e.preventDefault();  // Corrected typo here from `preventfault` to `preventDefault`

  if (!file) {
    console.log("No file selected");
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload"); // Make sure this preset is UNSIGNED

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dyxxmqwth/image/upload",
      data
    );
    const { url } = uploadRes.data; // Get the secure URL of the uploaded image
    const newUser = {
      ...info,
      img: url, // Use the URL from the upload response
    };
    console.log("New User Data:", newUser);
    //  await axios.post("/api/auth/register", newUser); 
    await axios.post(`${API}/auth/register`, newUser); // Use the API URL from .env to register a new user
    // await axios.post("http://localhost:8000/api/auth/register", newUser); //  this is the endpoint to register a new user   
    // console.log("Uploaded:", uploadRes.data);
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
  }
};
   console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">  
                  {/* // this label is used to trigger the file input. as the input is hidden, clicking on the label will open the file dialog */}
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange } type={input.type} placeholder={input.placeholder} id = {input.id} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
