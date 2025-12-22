let profile = {
  name: "이름",
  major: "전공",
  studentId: "학번",
  discordId: "디스코드 아이디",
  email: "이메일",
  intro: "자기소개",
  profileImg: "/default-profile.png",
};

export async function GET(request) {
  return Response.json(profile);
}

export async function PUT(request) {
  const body = await request.json();
  profile = { ...profile, ...body };
  return Response.json({ success: true });
}