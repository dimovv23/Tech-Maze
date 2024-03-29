import { useEffect, useState } from "react";
import moment from "moment";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="text-sm mr-1 truncate font-bold">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-400 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className=" text-gray-500 dark:text-gray-400 pb-2">
          {comment.content}
        </p>
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            className={`text-gray-400 hover:text-red-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-red-500"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FaHeart className="text-sm" />
          </button>
          <p className="text-gray-500 text-sm">
            {comment.numOfLikes > 0 &&
              comment.numOfLikes +
                " " +
                (comment.numOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
