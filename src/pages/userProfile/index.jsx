import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./style.module.css";
import FlipBox from "../../components/flipbox";
import InteractiveImage from "../../components/interactiveImage";
import generateQRCode from "../../utils/qrCode";
import { getUserfromId } from "../../utils/function";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const UserProfile = () => {
  const {userLoggedIn} = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    profilePhoto: "",
    coverPhoto: "",
    gender: "",
    dob: "",
  });

  const getuser = async () => {
    const response = await getUserfromId(id);
    
    if (response) {
      if(response.data===""){
        navigate("/createProfile")
      }
      setUser(response.data);
    }
  };

  const url = useLocation();

  const [qrSrc, setQrSrc] = useState("");

  const setQrcode = async () => {
    const baseUrl = "https://b95b-103-88-236-139.ngrok-free.app";
    setQrSrc(await generateQRCode(baseUrl + url.pathname));
  };

  useEffect(() => {
    setQrcode();
    getuser();
  }, []);

  const logout = async () => {
    await doSignOut();
    navigate("/login");
  };

  const login = async () => {
    
    navigate("/login");
  };


  return (
    <div className={styles.userProfile}>
      <div className={styles.navbar}>
        {userLoggedIn?<button onClick={logout}>Logout</button>:<button onClick={login}>Login</button>}
        
      </div>
      <img className={styles.coverImg} src={user.coverPhoto} alt="" />
      <img className={styles.profileImg} src={user.profilePhoto} alt="" />
      <h2>{user.name}</h2>

      <div className={styles.main}>
        <div className={styles.userInfo}>
          <FlipBox
            data={{ label: "Gender", value: user.gender }}
            color1={"#0081D0"}
            color2={"#008F79"}
          />
          <FlipBox
            data={{ label: "Phone", value: user.phone }}
            color1={"#4B4453"}
            color2={"#D03C2A"}
          />
          <FlipBox
            data={{ label: "D.O.B", value: user.dob }}
            color1={"#005245"}
            color2={"#845EC3"}
          />
        </div>
        <div className={styles.qrHolder}>
          <InteractiveImage src={qrSrc} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
