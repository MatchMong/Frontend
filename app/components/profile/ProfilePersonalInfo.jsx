export default function ProfilePersonalInfo({ data, isEditing, onChange, handleSave, handleCancel}) {
  const safeData = data || {};

  const labelMapping = {
  name: "이름",
  studentId: "학번",
  discordId: "디코 아이디",
  email: "이메일",
};


  return (
    <div>
      <h2 className="font-bold mb-6 text-2xl">개인 정보</h2>

      <div className="flex gap-4 flex-wrap">
        {["name", "studentId", "discordId", "email"].map((key) => (
          <div key={key}>
            <p className="font-semibold mb-1">{labelMapping[key] || {key}}</p>
            {isEditing && key !== "name" ? (
              <input
                value={safeData[key] || ""}
                placeholder={safeData[key] ? "" : `${labelMapping[key] || key}`}
                onChange={(e) => onChange(key, e.target.value)}
                className="flex border rounded-lg p-2 rounded w-full bg-gray-100 mb-10 p-2"
                style={{ width: "348px", height: "44px" }}
              />
            ) : (
              <p className="flex bg-[#F6F6F6] rounded-lg w-[348px] h-[44px] mb-10 p-2 ">{safeData[key] || "정보 없음"}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="font-semibold mb-1">자기소개</p>
        {isEditing ? (
          <textarea
            value={safeData.intro || ""}
            onChange={(e) => onChange("intro", e.target.value)}
            className="border p-2 rounded w-full bg-gray-100 w-[720px] h-[138px] resize-none rounded-xl"
          />
        ) : (
          <div className="bg-gray-100 p-2 rounded w-[720px] h-[138px] rounded-xl">
            {safeData.intro}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#5574FE] text-white font-semibold px-4 py-2 rounded-xl cursor-pointer"
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            className="border font-semibold px-4 py-2 rounded-xl cursor-pointer"
          >
            취소
          </button>
        </div>
      )}

    </div>
  );
}


