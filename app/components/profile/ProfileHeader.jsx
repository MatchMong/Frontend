"use client";
import React from "react";
import { Bell, LogOut, User } from "lucide-react";
import IconButton from "../IconButton";

const ProfileHeader = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white ">
      <div>
        {/* 로고 넣어야 할 부분 */}
        MatchMong
      </div>

      <div className="flex">
        <IconButton icon={<Bell />} />
        <IconButton icon={<User />} />
        <IconButton icon={<LogOut />}>
          <p className="font-bold text-lg">로그아웃</p>
        </IconButton>
      </div>
    </header>
  );
};

export default ProfileHeader;
