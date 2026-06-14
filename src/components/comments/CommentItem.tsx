"use client";
import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UpdateCommentModal } from "../comments/UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import axios from "axios";
interface IPropsComment {
  comment: CommentWithUser;
  userId: number | undefined;
}

export default function CommentItem({ comment, userId }: IPropsComment) {
  const [isopen, setopen] = useState(false);
const router=useRouter()
  const ModalHandeler = () => {
    setopen((prev) => !prev);
  };
  const commentDelet = async () => {
    try {
     if(confirm("you want delete this comment, Are you sure?")){
       await axios.delete(`/api/comments/${comment.id}`);
       router.refresh()
     }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Updata Comment failed");
      } else {
        toast.error("Unexpected error");
      }
    }
  };
  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <p className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </p>
      </div>

      <p className="text-gray-800 mb-2">{comment.text}</p>
      {userId && userId == comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            onClick={ModalHandeler}
            className="text-green-600 text-xl cursor-pointer me-3"
          />
          <FaTrash onClick={commentDelet} className="text-red-600 text-xl cursor-pointer" />
        </div>
      )}

      <UpdateCommentModal
        isopen={isopen}
        ModalHandeler={ModalHandeler}
        text={comment.text}
        commentId={comment.id}
        setopenModel={setopen}
      />
    </div>
  );
}
