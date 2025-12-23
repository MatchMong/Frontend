/* eslint-disable @next/next/no-img-element */
"use client";
// import DeleteBtn from "../DeleteBtn";
import { Camera } from "lucide-react";

const ProfileImage = ({ profileImg, setProfileImg, name, isEditing }) => {
  const firstLetter = profileImg ? name.charAt(0).toUpperCase() : "";

  const handleProfileImage = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    } else {
      setProfileImg("/loading-spinner.gif");

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        if (reader.readyState === 2) {
          const imgUrl = event.target.result;
          setProfileImg(imgUrl);
        }
      };
    }
  };

  // 삭제 기능
  // const deleteImage = () => {
  //   setProfileImg("/default-profile.png");
  // };

  return (
    <div>
      <div className="relative mr-8">
        {profileImg === "/default-profile.png" ? (
          <div
            className="flex items-center justify-center rounded-full shadow-lg"
            style={{
              width: 136,
              height: 136,
              background: "linear-gradient(135deg, #5574FE, #3F91FF)",
              fontSize: "50px",
              color: "#fff",
            }}
          >
            {firstLetter}
          </div>
        ) : (
          <img
            className="relative aspect-square rounded-full shadow-lg"
            src={profileImg}
            alt="프로필"
            width={136}
            height={136}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        )}
        
        {isEditing && (
          <Camera
            className="absolute bottom-0 right-0 mb-1 mt-1 cursor-pointer bg-white rounded-full p-2 shadow-md"
            size={35}
            onClick={() => {
              document.querySelector("#img").click();
            }}
          />
        )}
        {/* <Camera
          className="absolute bottom-0 right-0 mb-1 mt-1 cursor-pointer bg-white rounded-full p-2 shadow-md"
          size={35}
          onClick={() => {
            document.querySelector("#img").click();
          }}
        /> */}
      </div>

      <input
        type="file"
        id="img"
        onChange={handleProfileImage}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfileImage;
