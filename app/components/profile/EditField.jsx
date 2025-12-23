import { SquarePen } from "lucide-react";

const EditField = ({ tag, label, value, onChange, isEditing, toggleEditing, showIcon = true }) => {
  const Tag = tag || 'p';

  return (
    <div>
      <h2></h2>
      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={toggleEditing}
          autoFocus
        />
      ) : (
        <Tag>{value}</Tag>
      )}
      {showIcon && (
        <SquarePen
          className="ml-6 cursor-pointer"
          onClick={toggleEditing}
        />
      )}
    </div>
  );

}

export default EditField;

// import EditField from '../components/EditField';
// // import { isError } from 'util';

// const [profile, setProfile] = useState ({
//     name: "이름",
//     major: "전공",
//     classYear: "9기",
//     isEditing: false,
//   })

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleEditing = (filed) => {
//     setProfile((prev) => ({ ...prev, isEditing: !prev[isEditing]}));
//   };

// <EditField
//                 tag="h2"
//                 label="이름"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleInputChange}
//                 isEditing={profile.isEditingName}
//                 toggleEditing={() => toggleEditing("isEditingName")}
//                 showIcon={true}
//               />

//               <EditField
//                 tag="p"
//                 label="전공"
//                 name="major"
//                 value={profile.major}
//                 onChange={handleInputChange}
//                 isEditing={profile.isEditingMajor}
//                 toggleEditing={() => toggleEditing("isEditingMajor")}
//                 showIcon={false}
//               />

//               <EditField
//                 tag="p"
//                 label="전공"
//                 name="major"
//                 value={profile.major}
//                 onChange={handleInputChange}
//                 isEditing={profile.isEditingMajor}
//                 toggleEditing={() => toggleEditing("isEditingMajor")}
//                 className="text-[#2A4CFF] my-2"
//                 showIcon={false}
//               />