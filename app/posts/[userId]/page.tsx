"use client";
import Pagination from "@/components/Pagination";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UserPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  /**
   * Handler for change in page number
   * @param page
   */
  function onPageChange(page: number) {
    setPageNumber(page);
    console.log(page);
  }

  /**
   * @dev Handle errors from API call
   * @param error
   */
  function handleError(error: any) {
    if (error.status === 404) {
      toast.error("Resource Not Found", {
        position: "bottom-right",
        className: "bg-red-700 text-white p-3 text-sm",
      });
    } else if (error.status === 500) {
      toast.error("Internal Server Error", {
        position: "bottom-right",
        className: "bg-red-700 text-white p-3 text-sm",
      });
    } else {
      toast.error("Something went wrong", {
        position: "bottom-right",
        className: "bg-red-700 text-white p-3 text-sm",
      });
    }
  }

  /**
   * API call to fetch all the posts
   */
  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [pageNumber]);

  // Filter posts belonging to user ID
  const userPosts = posts.filter((post: any) => {
    return post.userId == userId;
  });

  // Set start index to render posts on a page
  const startIndex = (pageNumber - 1) * 4;

  return (
    <div className="m-5 p-5 lg:px-20 min-h-screen">
      <h2 className="text-center text-xl font-bold tracking-tight">
        Posts by ID: {userId}
      </h2>

      {loading && (
        <div className="h-[500px] flex justify-center items-center">
          <h3 className="">Loading...</h3>
        </div>
      )}

      <div className="flex flex-col justify-between min-h-[80vh]">
        <div>
          {!loading &&
            userPosts
              .slice(startIndex, startIndex + 4)
              ?.map((post: any, index: number) => (
                <div
                  key={index}
                  className="p-5 my-5 mx-3 bg-white/5 rounded-3xl"
                >
                  <h4 className="font-semibold text-lg">{post["title"]}</h4>
                  <p className="text-sm leading-5 pt-4">{post["body"]}</p>
                </div>
              ))}
        </div>
        <div>
          <Pagination
            length={userPosts.length}
            postsPerPage={4}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <ToastContainer hideProgressBar autoClose={false} />
    </div>
  );
}
