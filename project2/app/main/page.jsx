"use client";
import Modal from "./Modal";
import { useState } from "react";

export default function MainPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        모달 열기
      </button>

      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  );
}
