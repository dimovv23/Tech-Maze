import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [filterData, setFilterData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(filterData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("order");
    const categoryFromUrl = urlParams.get("category") || "uncategorized";
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setFilterData({
        ...filterData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length >= 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setFilterData({ ...filterData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setFilterData({ ...filterData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setFilterData({ ...filterData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    if (filterData.searchTerm) {
      urlParams.set("searchTerm", filterData.searchTerm);
    } else {
      urlParams.delete("searchTerm"); // Make sure to remove it if it's empty or undefined
    }
    urlParams.set("order", filterData.sort);
    if (filterData.category !== "uncategorized") {
      urlParams.set("category", filterData.category);
    } else {
      urlParams.delete("category");
    }

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    } else {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={filterData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort</label>
            <Select
              onChange={handleChange}
              value={filterData.sort}
              id="sort"
              className=""
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category</label>
            <Select
              onChange={handleChange}
              value={filterData.category}
              id="category"
              className=""
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="ai">AI</option>
              <option value="apps">Apps</option>
              <option value="coding">Coding</option>
              <option value="crypto">Crypto</option>
              <option value="hardware">Hardware</option>
              <option value="security">Security</option>
              <option value="social">Social</option>
              <option value="transportation">Transportation</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="pinkToOrange">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b p-3 mt-4">
          Search results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No articles found.</p>
          )}
          {loading && <p>TODO: add loading spinner</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-400 text-lg hover:underline w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
