"use client";

import { useState, useEffect } from "react";
import ProfileContainer from "../components/profile/ProfileContainer";
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await FetchGetAuth(`/api/profile/me`);

        const me = Array.isArray(res) ? res[0] : res;

        setProfile(me ?? null);
        setEditProfile(me ?? null);

        console.log("res:", res);
        console.log("me:", me);
      } catch (error) {
        console.log("프로필 불러오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);



  const handleChange = (key, value) => {
    setEditProfile((prev) => ({
      ...(prev ?? {}),
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!editProfile) return;

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

      // 서버가 수정된 프로필을 반환한다면 이걸로 갱신하는게 베스트:
      // const saved = await res.json();
      // setProfile(saved);
      // setEditProfile(saved);

      setProfile(editProfile);
      setEditProfile(editProfile);
      setEditing(false);
      alert("프로필이 수정되었습니다.");
    } catch (e) {
      alert("저장 실패");
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setEditing(false);
  };

  if (!editProfile) {
    return (
      <div className="bg-[#EAEDFF] min-h-screen">
        <MainHeader />
        <div className="mx-30 mt-10">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#EAEDFF]">
      <MainHeader />

      <div className="mx-30 mt-10">
        <h1 className="text-4xl font-bold">프로필</h1>
        <p className="mt-4 mb-6">개인 정보를 관리하고 업데이트하세요</p>
      </div>

      <div className="flex flex-wrap justify-around">
        <ProfileContainer className="p-8">
          <ProfileImage
            profileImg={editProfile.profileImg}
            name={editProfile.nickname}
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

        <ProfileContainer className="p-10">
          <ProfilePersonalInfo
            data={editProfile}
            isEditing={isEditing}
            onChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            isSaving={isSaving}
          />
        </ProfileContainer>
      </div>
    </div>
  );
};

export default ProfilePage;
