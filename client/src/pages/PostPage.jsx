import { Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { FaRegClock } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        if (res.ok) {
          const data = await res.json();
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      {/* TODO: add the path for the Link */}
      <Link className="self-center mt-4">
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span className="flex items-center justify-between gap-1">
          <CiCalendar size={18} />
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="italic flex items-center justify-between gap-1">
          <FaRegClock size={12} />
          {(post.content.length / 1000).toFixed(0) > 0
            ? (post.content.length / 1000).toFixed(0)
            : 1}{" "}
          min read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-4">
        <h2 className="text-2xl font-semibold mt-5">
          Recent news and articles
        </h2>
        <div className="flex flex-wrap gap-5 mt-4 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
