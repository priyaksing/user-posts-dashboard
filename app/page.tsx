"use client";
import User from "@/components/User";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const searchref = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
   * @dev Search feature
   * @returns filtered users based on name or email
   */
  function handleSearch() {
    if (searchref.current?.value === "") {
      fetchUsers();
      return;
    }

    const filterUsers = users.filter((user: any) => {
      if (
        user["name"]
          .toLowerCase()
          .includes(searchref.current?.value.toLowerCase()) ||
        user["email"]
          .toLowerCase()
          .includes(searchref.current?.value.toLowerCase())
      ) {
        return user;
      }
    });
    setUsers(filterUsers);
  }

  /**
   * @dev function to sort users by name or company name
   * @param key
   */
  function handleSort(key: string) {
    let sorted;
    if (key === "company") {
      sorted = [...users].sort((a, b) =>
        a["company"]["name"].localeCompare(b["company"]["name"])
      );
    } else {
      sorted = [...users].sort((a, b) => a[key].localeCompare(b[key]));
    }

    setUsers(sorted);
  }

  /**
   * API call to fetch users
   */
  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-5 lg:px-20">
      <h2 className="pt-10 pb-4 text-center text-2xl font-semibold tracking-wide">
        User and Post Dashboard
      </h2>
      <div className="pb-4 m-3 md:m-5 lg:m-10 flex flex-col lg:flex-row lg:justify-between gap-4 items-center">
        <div className="flex justify-center items-center gap-4">
          <input
            ref={searchref}
            type="text"
            placeholder="Search by name or email"
            className="px-3 py-2 text-black outline-none"
          />
          <button
            onClick={handleSearch}
            className="border border-white px-3 py-2 hover:text-black hover:bg-white transition"
          >
            Search
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p>Sort by</p>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="text-black px-3 py-2 outline-none w-fit"
            defaultValue={""}
          >
            <option value=""></option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && <h3 className="text-center p-5">Loading...</h3>}
      {/* {isError && <h3 className="text-center p-5">{error.message}</h3>} */}

      {!loading &&
        users.map((user: any, index: number) => (
          <div key={index} className="m-3 md:m-5 lg:m-10">
            <User
              id={user["id"]}
              name={user["name"]}
              email={user["email"]}
              company={user["company"]}
              address={user["address"]}
            />
          </div>
        ))}
      <ToastContainer hideProgressBar autoClose={false} />
    </div>
  );
}
