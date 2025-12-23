import React from "react";

const ProfileContainer = ({ children, className }) => {
  return (
    <div
      className={`flex justify-start items-center bg-white w-[802px] rounded-4xl shadow-lg mb-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default ProfileContainer;

