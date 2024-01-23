import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet,  useNavigate } from "react-router-dom";
import {userAction} from './userSlice'
const Main = () => {
  const [users, setUsers] = useState([]);
  const me = useSelector((state) => state.user.user);
  const navigate = useNavigate();
    const dispatch = useDispatch()
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:6001/user");
      if (!response.ok) {
        console.log("could not get users");
      }
      let users = await response.json();
      users = users.filter((user) => user.id != localStorage.getItem("user"));
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  const goIntoChat = async (id) => {
    navigate(`/home/${id}`);
  };
  const onLogout = () => {
    localStorage.removeItem('user')
    dispatch(userAction.setUser(null))
    navigate('/login')
  }

  return (
    <>
      {me && (
        <header className="h-20 flex justify-between ">
          <div className=" flex gap-16">
            <img src={me.photo_link} className="pt-2 rounded-full ml-5 h-16" />
            <span className="pt-5 text-xl">{me.name}</span>
          </div>
          <button onClick={() => onLogout()} className="shadow-md shadow-white w-40 h-10 mt-5 mr-10">
            Log Out
          </button>
        </header>
      )}
      <div className=" text-white flex ">
        <ul className="flex flex-col h-96 overflow-x-hidden ">
          {users &&
            users.map((user) => {
              return (
                <li key={user.id}>
                  <button
                    className="bg-slate-700 text-white w-72 border border-gray-600 border-solid h-20 flex gap-10"
                    onClick={() => goIntoChat(user.id)}
                  >
                    <img
                      className="h-14 w-14 mt-2 ml-5 rounded-full"
                      src={user.photo_link}
                    />
                    <span className="text-xl  mt-5">{user.name}</span>
                  </button>
                </li>
              );
            })}
        </ul>
        {/* {path === "/home" && (
          <div className="text-white  w-full bg-gray-700 text-center text-4xl pt-40">
            <img src="" />
            <h1>Welcome</h1>
          </div>
        )} */}
        <Outlet />
      </div>
    </>
  );
};

export default Main;
