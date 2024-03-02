import React from "react";
import Input from "../../components/input";
import { useState, useRef } from "react";
import styles from "./style.module.css";
import { uploadImg, createUser } from "../../utils/function";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const profilePhotoInput = useRef(null);
  const coverPhotoInput = useRef(null);

  const handelprofileClick = (e) => {
    e.preventDefault();
    profilePhotoInput.current.click();
  };

  const handelCoverClick = (e) => {
    e.preventDefault();
    coverPhotoInput.current.click();
  };

  const profileinput = (e) => {
    const file = e.target.files[0];

    uploadImg(file).then((res) => {
      setProfilePhoto(res);
    });
  };

  const coverinput = (e) => {
    const file = e.target.files[0];

    uploadImg(file).then((res) => {
      setCoverPhoto(res);
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };

  const createUserProfile = (e) => {
    e.preventDefault();
    const user = {
      name,
      phone,
      profilePhoto,
      coverPhoto,
      gender,
      dob,
      uid: currentUser.uid,
    };
    createUser(user).then(() => {
      navigate("/user/" + user.uid);
    });
  };

  return (
    <div className={styles.bigdiv}>
      <h1>Create Your Profile</h1>
      <form className={styles.loginForm}>
        <div className={styles.name_phone}>
          <Input
            placeholder={"Enter your Name"}
            value={name}
            onChange={setName}
          />
          <Input
            placeholder={"Enter your Phone Number"}
            type={"number"}
            value={phone}
            onChange={setPhone}
          />
          <button onClick={handelprofileClick}>Upload Profile Photo</button>
          <button onClick={handelCoverClick}>Upload Cover Photo</button>
          {!!profilePhoto ? <img  src={profilePhoto} alt="" />:<div className={styles.imagePlaceHolder}>Upload to Preview</div>  }
          {!!coverPhoto ? <img  src={coverPhoto} alt="" />:<div className={styles.imagePlaceHolder}>Upload to Preview</div>}
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ visibility: "hidden" }}
          ref={profilePhotoInput}
          onChange={(e) => profileinput(e)}
        />

        <input
          type="file"
          accept="image/*"
          style={{ visibility: "hidden" }}
          ref={coverPhotoInput}
          onChange={coverinput}
        />
        <div className={styles.uploadbtn}></div>

        <div className={styles.gender}>
          <h2>Select Your Gender</h2>
          <div className={styles.radioHolder}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={handleGenderChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className={styles.dob}>
          <h2>Select Your Date of Birth</h2>
          <div>
            <input
              type="date"
              value={dob}
              onChange={handleDOBChange}
              max={new Date().toISOString().split("T")[0]} // Set max date to today's date
            />
          </div>
        </div>

        <button className={styles.Next} onClick={createUserProfile}>
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
