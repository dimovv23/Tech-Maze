import { useEffect, useState } from "react";
import moment from "moment";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea, Button } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
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

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
        {isEditing ? (
          <>
            <Textarea
              onChange={(e) => setEditedContent(e.target.value)}
              value={editedContent}
              className="resize-none mb-2"
            />
            <div className="flex items-center justify-end gap-1">
              <Button
                onClick={handleSave}
                type="button"
                size="xs"
                gradientDuoTone="pinkToOrange"
              >
                Save
              </Button>
              <Button
                type="button"
                outline
                size="xs"
                gradientDuoTone="pinkToOrange"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className=" text-gray-500 dark:text-gray-400 pb-2">
              {comment.content}
            </p>
            <div className="flex items-center gap-2 pt-2 max-w-fit border-t border-gray-600">
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
              <p className="text-gray-500 text-xs">
                {comment.numOfLikes > 0 &&
                  comment.numOfLikes +
                    " " +
                    (comment.numOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className=" text-xs text-gray-500 hover:text-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      type="button"
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
