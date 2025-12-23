import { SquarePen } from "lucide-react";

export default function ProfileBasicInfo({ data, isEditing, onChange, onEdit}) {
  return (
    <div className="">
      <div className="flex items-center gap-3">
        {/* <h2 className="text-2xl font-semibold">{data.name}</h2> */}
        {isEditing ? (
          <input
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className=" p-1 text-2xl font-semibold rounded-lg"
            // readOnly // 이름 수정 x
          />
        ) : (
          <h2 className="text-2xl font-semibold">{data.name}</h2>
        )}
        <SquarePen
          className="cursor-pointer"
          onClick={onEdit}
        />
      </div>

      {isEditing ? (
        <input
          value={data.major}
          onChange={(e) => onChange("major", e.target.value)}
          className="border p-1 rounded mt-2"
          placeholder="전공"
        />
      ) : (
        <p className="text-blue-500 font-semibold mt-2">{data.major}</p>
      )}
    <p className="mt-1">9기</p>
    </div>
  )
}