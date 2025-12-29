"use client";

import { useState, useEffect } from "react";
// import { SquarePen } from "lucide-react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileContainer from "../components/profile/ProfileContainer";
// import InputField from "../components/InputField";
import ActivityStats from "../components/profile/ActivityStats";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileBasicInfo from "../components/profile/ProfileBasicInfo";
import ProfilePersonalInfo from "../components/profile/ProfilePersonalInfo";
import { MainHeader } from "../components";
import { FetchGetAuth } from "../hook/Fetch";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 데이터 가져 옴
  useEffect(() => {
    const Profile1 = async () => {
        try {
            const res = await FetchGetAuth(`/api/profile/me`, null);
            setProfile(res);
        } catch(error) {
            console.log("프로필 불러오기 실패: " + error)
        }
    };
    Profile1();
  }, []);

  // 변경
  const handleChange = (key, value) => {
    setEditProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 저장
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editProfile),
      });

      if (!res.ok) throw new Error(await res.text());

      setProfile(editProfile);
      setEditing(false);
      alert("프로필이 수정되었습니다.");
    } catch (e) {
      alert("저장 실패");
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };


  // 취소
  const handleCancel = () => {
    setEditProfile(profile);
    setEditing(false);
  };

  useEffect(() => {
    const Profile1 = async () => {
      try {
        const res = await FetchGetAuth(`/api/profile/me`, null);
        setProfile(res);
        setEditProfile(res);
      } catch (error) {
        console.log("프로필 불러오기 실패: " + error);
      }
    };
    Profile1();
  }, []);

  return (
    <div className="bg-[#EAEDFF]">
      <MainHeader />
      <div>
        <div className="mx-30 mt-10">
          <h1 className="text-4xl font-bold">프로필</h1>
          <p className="mt-4 mb-6">개인 정보를 관리하고 업데이트하세요</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-around">
        {/* 프로필 */}
        <ProfileContainer className="p-8">
          <ProfileImage
            profileImg={editProfile}
            name={editProfile}
            setProfileImg={(img) => handleChange("profileImg", img)}
            isEditing={isEditing}
          />

          <ProfileBasicInfo
            className="ml-10"
            data={editProfile}
            isEditing={isEditing}
            onChange={handleChange}
            onEdit={() => setEditing(true)}
          />
        </ProfileContainer>

        {/* 개인 정보 */}
        <ProfileContainer className="p-10">
          <ProfilePersonalInfo
            data={editProfile}
            isEditing={isEditing}
            onChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </ProfileContainer>

        {/* 활동 통계 */}
        <ProfileContainer className="p-10 mb-20">
          <ActivityStats />
        </ProfileContainer>

      </div>
    </div>
  );
};

export default ProfilePage;
