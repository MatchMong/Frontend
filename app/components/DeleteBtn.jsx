import { Trash2 } from "lucide-react"

const DeleteBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className=""
    >
      <Trash2 size={20} />
    </button>
  );
}

export default DeleteBtn;