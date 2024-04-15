import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div
      className="group relative w-full border h-[320px] overflow-hidden 
    sm:w-[360px] border-gray-600 rounded-md"
    >
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.slug}
          className="h-[220px] w-full object-cover 
          group-hover:h-[140px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-2 p-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <div className="italic text-sm flex items-center justify-between text-gray-400">
          <span>{post.category}</span>
          <span className="flex items-center gap-1">
            <FaRegClock size={12} />
            {(post.content.length / 1000).toFixed(0) > 0
              ? (post.content.length / 1000).toFixed(0)
              : 1}{" "}
            min read
          </span>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="dark:text-white z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0
           border border-red-400 text-stone-950 hover:text-white hover:bg-gradient-to-tr from-red-400 via-orange-500 to-pink-500  transition-all duration-300 
           text-center py-2 rounded-md m-2 !rounded-tl-none !rounded-br-none"
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
