"use client";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";
import UserList from "@/components/userlist/Userlist";

import Input from "@/components/input/Input";
import Commands from "@/components/commands/Commands";
import Notification from "@/components/notification/Notification";

const Home = () => {
  let oldMessage = null;
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const viewerRef = useRef();
  const { push } = useRouter();

  const onSession = ({ sessionID, userID }) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID);
    // save the ID of the user
    socket.userID = userID;
  };

  const onUserConnect = (user) => {};
  const onUserDisconnect = (user) => {};

  const onMessage = (message) => {
    setMessages((oldMessages) => [...oldMessages, message]);
  };

  const getUsersAtInit = (_users) => {
    setUsers(_users);
  };

  const getMessagesAtInit = (messagesAtInit) => {
    // get messages when you connect to the server
    setMessages(messagesAtInit);
  };

  const onConnectionError = (err) => {
    console.log("test");
    localStorage.clear("username");
    localStorage.clear("sessionID");
    localStorage.setItem("error", 200);
    push("/login");
  };

  const scrollToBottom = () => {
    viewerRef.current.scrollTop = viewerRef.current.scrollHeight;
  };

  const onError = ({ code, error }) => {
    console.log(code, error);

    let title = "";
    let content = "";

    switch (code) {
      // code 100, vous savez que ça correspond à du spam, donc vous pouvez changer les valeurs
      case 100:
        title = `Erreur ${code} : Spam`;
        content = "Tu spam trop chacal";
        break;

      // case 200:
      //   break;

      default:
        break;
    }

    setError({
      title,
      content,
    });
  };

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    // session is already defined
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
      // first time connecting and has already visited login page
    } else if (localStorage.getItem("username")) {
      const username = localStorage.getItem("username");
      socket.auth = { username };
      socket.connect();
      //   // redirect to login page
    } else {
      // uncomment
      // push("/login");
    }

    socket.on("error", onError);
    socket.on("session", onSession);
    socket.on("message", onMessage);
    socket.on("messages", getMessagesAtInit);
    socket.on("users", getUsersAtInit);
    socket.on("disconnect", onConnectionError);
    socket.on("connect_error", onConnectionError);
    socket.on("connect", onUserConnect);
    socket.on("disconnect", onUserDisconnect);

    return () => {
      socket.off("error", onError);
      socket.off("users", getUsersAtInit);
      socket.off("session", onSession);
      socket.off("message", onMessage);
      socket.off("messages", getMessagesAtInit);
      socket.off("connect_error", onConnectionError);
      socket.off("connect", onUserConnect);
      socket.off("disconnect", onUserDisconnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full w-full bg-[#313338] text-white flex overflow-hidden">
      <div className=" flex flex-col gap-2 p-[12px] h-full w-[72px] z-10 bg-[#1e1f22]">
        <div className="relative">
          <div className="h-[82%] w-[8px] bg-white opacity-90 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full aspect-square rounded-2xl bg-[#5865f2] relative cursor-pointer">
            <img
              src="/discord.png"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="w-[65%] h-[1.5px] mx-auto bg-white opacity-[0.1] relative"></div>
        <div className="relative group/image1">
          <div className="h-[50%] w-[8px] bg-white opacity-0 group-hover/image1:opacity-90 duration-200 scale-0 group-hover/image1:scale-100 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full aspect-square rounded-[24px] hover:rounded-2xl duration-200 bg-[#EB459F] cursor-pointer">
            <img
              src="/discord.png "
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="relative group/image3">
          <div className="h-[50%] w-[8px] bg-white opacity-0 group-hover/image3:opacity-90 duration-200 scale-0 group-hover/image3:scale-100 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full aspect-square rounded-[24px] hover:rounded-2xl duration-200 bg-[#faa61a] cursor-pointer">
            <img
              src="/discord.png "
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="relative group/image1">
          <div className="h-[15%] w-[8px] bg-white group-hover/image1:h-[50%] duration-200 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full aspect-square rounded-[24px] hover:rounded-2xl duration-200 bg-[#29c566] cursor-pointer">
            <img
              src="/discord.png"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="relative group/plus">
          <div className="h-[50%] w-[8px] bg-white opacity-0 group-hover/plus:opacity-90 duration-200 scale-0 group-hover/plus:scale-100 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full relative aspect-square rounded-[24px] bg-[#313338] cursor-pointer hover:bg-[#23a559] duration-200 hover:rounded-2xl">
            <svg
              ariaHidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute group-hover/plus:text-white duration-200 text-[#23a559]"
            >
              <path
                fill="currentColor"
                d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative group/discover">
          <div className="h-[50%] w-[8px] bg-white opacity-0 group-hover/discover:opacity-90 duration-200 scale-0 group-hover/discover:scale-100 absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full relative aspect-square rounded-[24px] bg-[#313338] cursor-pointer hover:bg-[#23a559] duration-200 hover:rounded-2xl">
            <svg
              ariaHidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute group-hover/discover:text-white duration-200 text-[#23a559]"
            >
              <path
                fill="currentColor"
                d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="w-[65%] h-[1.5px] mx-auto bg-white opacity-[0.1] relative"></div>
        <div className="relative group/download">
          <div className="h-[50%] w-[8px] bg-white opacity-0 group-hover/download:opacity-90 duration-200 scale-0 group-hover/download:scale-100  absolute left-[-12px] -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="w-full relative aspect-square rounded-[24px] bg-[#313338] cursor-pointer hover:bg-[#23a559] duration-200 hover:rounded-2xl">
            <svg
              ariaHidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-6 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute group-hover/download:text-white duration-200 text-[#23a559]"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-60 bg-[#2b2d31] h-full flex flex-col">
        <div className="w-full h-[48px] p-2.5 shadow-[0px_1px_1px_rgba(0,0,0,0.5)]">
          <div className="w-full h-full rounded-md px-2 py-1 bg-[#1e1f22]">
            <p className="text-sm opacity-50 troncate">
              Rechercher/lancer une conversation
            </p>
          </div>
        </div>
        <div className="w-full h-[calc(100%-96px)] overflow-y-scroll scrolling p-2 flex flex-col gap-1">
          <div className="p-2 flex opacity-50 hover:opacity-75 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer">
            <div className="pl-1 pr-4">
              <svg
                className="w-6 h-6"
                ariaHidden="true"
                role="img"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="currentColor"
                    fillRule="nonzero"
                    d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                    transform="translate(2 4)"
                  ></path>
                  <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                </g>
              </svg>
            </div>
            <p>Amis</p>
          </div>
          <div className="p-2 flex opacity-50  hover:opacity-75 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer">
            <div className="pl-1 pr-4">
              <svg
                className="w-6 h-6"
                ariaHidden="true"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"
                ></path>
              </svg>
            </div>
            <p>Nitro</p>
          </div>
          <p className="text-xs opacity-50 px-3 pt-5 pb-1">MESSAGES PRIVÉS</p>
          <UserList users={users} />
        </div>
        <div className="w-full h-[50px] p-2 bg-[#232428] flex">
          {users.map((user) => {
            return user.connected ? (
              <>
                <div className="relative">
                  <div
                    className="h-full aspect-square rounded-full relative cursor-pointer"
                    style={{
                      backgroundColor: `hsl(${
                        parseInt(user.userID[0], 36) * 23 +
                        parseInt(user.userID[1], 36)
                      },81%,60%)`,
                    }}
                  >
                    <img
                      src="/discord.png"
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#23a55a] border-[0.25rem] border-solid border-[#2b2d31] rounded-full w-[1.1rem] h-[1.1rem] z-10"></div>
                </div>
              </>
            ) : null;
          })}
          <div className="w-full h-full rounded-md px-2 py-1">
            {users.map((user) => {
              return user.connected ? <p>{user.username}</p> : null;
            })}
          </div>
          <div className="w-full h-full flex opacity-75">
            <svg
              className="h-[32px] w-[20px] cursor-pointer"
              ariaHidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                fill="currentColor"
              ></path>
              <path
                d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                fill="currentColor"
              ></path>
              <path
                d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                className="strikethrough-2Kl6HF"
                fill="red"
              ></path>
            </svg>
            <svg
              className="h-[32px] mx-3 w-[20px] cursor-pointer"
              ariaHidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                  fill="currentColor"
                ></path>
              </svg>
            </svg>
            <svg
              className="h-[32px] w-[20px] cursor-pointer"
              ariaHidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-15rem-75px)]">
        <div className="w-full h-[48px] py-3 pl-4 pr-2 shadow-[0px_1px_1px_rgba(0,0,0,0.25)]">
          <div className="flex h-full float-left">
            <div className="relative">
              <div className="h-[24px] aspect-square rounded-full bg-[#5865f2] relative cursor-pointer">
                <img
                  src="/discord.png"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#23a55a] border-[0.2rem] border-solid border-[#2b2d31] rounded-full w-[1rem] h-[1rem] z-10"></div>
            </div>
            <div className="w-full self-center h-full rounded-md px-3 font-bold">
              Akira
            </div>
          </div>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 5V3C16.515 3 21 7.486 21 13H19C19 8.589 15.411 5 11 5ZM17 13H15C15 10.795 13.206 9 11 9V7C14.309 7 17 9.691 17 13ZM11 11V13H13C13 11.896 12.105 11 11 11ZM14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16Z"
            ></path>
          </svg>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              fill="currentColor"
              d="M21.526 8.149C21.231 7.966 20.862 7.951 20.553 8.105L18 9.382V7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.104 2.897 19 4 19H16C17.103 19 18 18.104 18 17V14.618L20.553 15.894C20.694 15.965 20.847 16 21 16C21.183 16 21.365 15.949 21.526 15.851C21.82 15.668 22 15.347 22 15V9C22 8.653 21.82 8.332 21.526 8.149Z"
            ></path>
          </svg>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              fill="currentColor"
              d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"
            ></path>
          </svg>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"
            ></path>
          </svg>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C12.4883 22 12.9684 21.965 13.438 21.8974C12.5414 20.8489 12 19.4877 12 18C12 17.6593 12.0284 17.3252 12.083 17H6V16.0244C6 14.0732 10 13 12 13C12.6215 13 13.436 13.1036 14.2637 13.305C15.2888 12.4882 16.5874 12 18 12C19.4877 12 20.8489 12.5414 21.8974 13.438C21.965 12.9684 22 12.4883 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12Z"
                fill="currentColor"
              ></path>
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <div className="w-[150px] h-full flex rounded-md float-right px-2 py-1 bg-[#1e1f22]">
            <p className="text-sm w-full opacity-50 troncate self-center">
              Rechercher
            </p>
            <svg
              ariaHidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-4 h-4 opacity-50 self-center"
            >
              <path
                fill="currentColor"
                d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
              ></path>
            </svg>
          </div>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            x="0"
            y="0"
            ariaHidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-60 self-center mx-2 float-right"
          >
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"
            ></path>
          </svg>
        </div>
        <div
          ref={viewerRef}
          className="w-full h-[calc(100%-48px-68px)] overflow-y-scroll scrolling py-4"
        >
          <div className="px-4">
            <div className="h-[80px] aspect-square overflow-hidden rounded-full bg-[#5865f2] relative cursor-pointer">
              <img
                src="/group.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <h1 className="text-3xl mt-2 font-bold">General Messages</h1>
            <p className="opacity-80 my-4">
              This is the beginning of your direct messages with your friends
            </p>
            <div className=" mt-6 mb-4 h-[1px] w-full bg-[rgba(255,255,255,0.1)] relative">
              <p className="absolute text-xs bg-[#313338] text-[rgba(255,255,255,0.5)] px-1 top-[-7.5px] left-1/2 -translate-x-1/2 ">
                01 Octobre 2023
              </p>
            </div>
          </div>
          {error && (
            <Notification
              title={error.title}
              content={error.content}
              onClose={() => setError(null)}
            />
          )}

          {/* rend la liste des messages */}
          <div className="">
            {messages.map((message, key) => {
              if (
                oldMessage != null &&
                oldMessage.username === message.username
              ) {
                return (
                  <div
                    key={key}
                    className="hover:bg-[rgba(0,0,0,0.05)] gap-2 px-4 flex relative group/edit"
                  >
                    <div className=" hover:shadow-[#1e1f22] hover:shadow-md overflow-hidden h-min w-min bg-[#313338] border border-solid border-[#2b2d31] absolute right-10 top-0 rounded-md opacity-0 group-hover/edit:opacity-100 -translate-y-1/2 flex">
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.1151 2.00065C12.0768 2.00022 12.0384 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.9616 21.9998 11.9232 21.9993 11.8849C21.1882 12.1737 20.3146 12.3309 19.4043 12.3309C15.1323 12.3309 11.6691 8.86771 11.6691 4.59565C11.6691 3.68536 11.8263 2.8118 12.1151 2.00065ZM7.92105 11.8023C7.92105 12.7107 7.18468 13.4471 6.27631 13.4471C5.36795 13.4471 4.63158 12.7107 4.63158 11.8023C4.63158 10.894 5.36795 10.1576 6.27631 10.1576C7.18467 10.1576 7.92105 10.894 7.92105 11.8023ZM10.5217 14.5171C10.3859 13.9893 9.84786 13.6716 9.32005 13.8074C8.79223 13.9433 8.47448 14.4813 8.61033 15.0091C9.01196 16.5695 10.4273 17.7236 12.1147 17.7236C13.8021 17.7236 15.2174 16.5695 15.6191 15.0091C15.7549 14.4813 15.4372 13.9433 14.9093 13.8074C14.3815 13.6716 13.8435 13.9893 13.7077 14.5171C13.525 15.2267 12.8797 15.7499 12.1147 15.7499C11.3497 15.7499 10.7044 15.2267 10.5217 14.5171Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M18.5 2C17.9477 2 17.5 2.44772 17.5 3V4.5H16C15.4477 4.5 15 4.94771 15 5.5C15 6.05228 15.4477 6.5 16 6.5H17.5V8C17.5 8.55228 17.9477 9 18.5 9C19.0523 9 19.5 8.55229 19.5 8V6.5H21C21.5523 6.5 22 6.05229 22 5.5C22 4.94772 21.5523 4.5 21 4.5H19.5V3C19.5 2.44772 19.0523 2 18.5 2Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.3397 14.2379C21.2318 14.4731 22.1292 14.5474 23 14.4789C22.9906 14.5151 22.9809 14.5514 22.9711 14.5876C21.5194 19.9201 15.9496 23.086 10.5309 21.6569C10.3451 21.6079 10.1619 21.5542 9.98145 21.4958C7.94618 20.8378 5.90941 20 3.77041 20H3.5C2.67157 20 2 19.3284 2 18.5C2 17.6716 2.67157 17 3.5 17C4.75918 17 3.9661 15.8584 3.47514 14.7655C3.28101 14.3334 2.86615 14 2.39244 14H1.5C0.671573 14 0 13.3284 0 12.5C0 11.6716 0.671573 11 1.5 11V11C2.38174 11 3.10559 10.3274 3.33171 9.47516C3.33726 9.45427 3.34287 9.43338 3.34856 9.41249V9.41249C3.53406 8.7311 2.9812 8.0187 2.44976 7.55366C2.17543 7.31362 2 6.96872 2 6.5C2 5.67157 2.67157 5 3.5 5V5C5.03983 5 6.4765 4.31861 7.78941 3.51404C10.0926 2.10261 12.9612 1.59744 15.7887 2.34316C15.827 2.35324 15.8651 2.36352 15.9031 2.374C15.4064 3.08271 15.0224 3.88574 14.7831 4.76493C13.6598 8.89108 16.1476 13.1323 20.3397 14.2379ZM9.26206 8.71607C8.70747 8.56981 8.13976 8.79579 7.83448 9.23964C7.62045 9.55083 7.19184 9.86027 6.69655 9.72964C6.24033 9.60932 5.88292 9.10507 6.13732 8.60064C6.78216 7.32202 8.27206 6.62396 9.72714 7.00771C11.1822 7.39146 12.1179 8.72923 12.0268 10.1539C11.9909 10.7159 11.4252 10.9767 10.969 10.8564C10.4737 10.7258 10.2597 10.2469 10.2324 9.87205C10.1935 9.33743 9.81666 8.86234 9.26206 8.71607ZM16.3671 14.9268C16.17 14.5422 15.7892 14.2404 15.3308 14.1195L10.6411 12.8827C10.1826 12.7618 9.69947 12.8357 9.33352 13.0718C8.95878 13.3135 8.70829 13.7284 8.7613 14.2422C8.93054 15.8827 10.1055 17.3278 11.821 17.7802C13.5365 18.2326 15.2881 17.5594 16.2681 16.222C16.575 15.8031 16.5688 15.3205 16.3671 14.9268Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M20.5 4C19.9477 4 19.5 4.44772 19.5 5V6.5H18C17.4477 6.5 17 6.94771 17 7.5C17 8.05228 17.4477 8.5 18 8.5H19.5V10C19.5 10.5523 19.9477 11 20.5 11C21.0523 11 21.5 10.5523 21.5 10V8.5H23C23.5523 8.5 24 8.05229 24 7.5C24 6.94772 23.5523 6.5 23 6.5H21.5V5C21.5 4.44772 21.0523 4 20.5 4Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-[42px] relative">
                        <p className="text-xs w-full text-right group-hover/edit:opacity-50 opacity-0 font-light">
                          00:00
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="opacity-80 px-2">{message.content}</p>
                    </div>
                  </div>
                );
              } else {
                oldMessage = message;
                return (
                  <div
                    key={key}
                    className="mt-5 hover:bg-[rgba(0,0,0,0.05)] gap-2 px-4 flex relative group/edit"
                  >
                    <div className=" hover:shadow-[#1e1f22] hover:shadow-md overflow-hidden h-min w-min bg-[#313338] border border-solid border-[#2b2d31] absolute right-10 top-0 rounded-md opacity-0 group-hover/edit:opacity-100 -translate-y-1/2 flex">
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.1151 2.00065C12.0768 2.00022 12.0384 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.9616 21.9998 11.9232 21.9993 11.8849C21.1882 12.1737 20.3146 12.3309 19.4043 12.3309C15.1323 12.3309 11.6691 8.86771 11.6691 4.59565C11.6691 3.68536 11.8263 2.8118 12.1151 2.00065ZM7.92105 11.8023C7.92105 12.7107 7.18468 13.4471 6.27631 13.4471C5.36795 13.4471 4.63158 12.7107 4.63158 11.8023C4.63158 10.894 5.36795 10.1576 6.27631 10.1576C7.18467 10.1576 7.92105 10.894 7.92105 11.8023ZM10.5217 14.5171C10.3859 13.9893 9.84786 13.6716 9.32005 13.8074C8.79223 13.9433 8.47448 14.4813 8.61033 15.0091C9.01196 16.5695 10.4273 17.7236 12.1147 17.7236C13.8021 17.7236 15.2174 16.5695 15.6191 15.0091C15.7549 14.4813 15.4372 13.9433 14.9093 13.8074C14.3815 13.6716 13.8435 13.9893 13.7077 14.5171C13.525 15.2267 12.8797 15.7499 12.1147 15.7499C11.3497 15.7499 10.7044 15.2267 10.5217 14.5171Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M18.5 2C17.9477 2 17.5 2.44772 17.5 3V4.5H16C15.4477 4.5 15 4.94771 15 5.5C15 6.05228 15.4477 6.5 16 6.5H17.5V8C17.5 8.55228 17.9477 9 18.5 9C19.0523 9 19.5 8.55229 19.5 8V6.5H21C21.5523 6.5 22 6.05229 22 5.5C22 4.94772 21.5523 4.5 21 4.5H19.5V3C19.5 2.44772 19.0523 2 18.5 2Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.3397 14.2379C21.2318 14.4731 22.1292 14.5474 23 14.4789C22.9906 14.5151 22.9809 14.5514 22.9711 14.5876C21.5194 19.9201 15.9496 23.086 10.5309 21.6569C10.3451 21.6079 10.1619 21.5542 9.98145 21.4958C7.94618 20.8378 5.90941 20 3.77041 20H3.5C2.67157 20 2 19.3284 2 18.5C2 17.6716 2.67157 17 3.5 17C4.75918 17 3.9661 15.8584 3.47514 14.7655C3.28101 14.3334 2.86615 14 2.39244 14H1.5C0.671573 14 0 13.3284 0 12.5C0 11.6716 0.671573 11 1.5 11V11C2.38174 11 3.10559 10.3274 3.33171 9.47516C3.33726 9.45427 3.34287 9.43338 3.34856 9.41249V9.41249C3.53406 8.7311 2.9812 8.0187 2.44976 7.55366C2.17543 7.31362 2 6.96872 2 6.5C2 5.67157 2.67157 5 3.5 5V5C5.03983 5 6.4765 4.31861 7.78941 3.51404C10.0926 2.10261 12.9612 1.59744 15.7887 2.34316C15.827 2.35324 15.8651 2.36352 15.9031 2.374C15.4064 3.08271 15.0224 3.88574 14.7831 4.76493C13.6598 8.89108 16.1476 13.1323 20.3397 14.2379ZM9.26206 8.71607C8.70747 8.56981 8.13976 8.79579 7.83448 9.23964C7.62045 9.55083 7.19184 9.86027 6.69655 9.72964C6.24033 9.60932 5.88292 9.10507 6.13732 8.60064C6.78216 7.32202 8.27206 6.62396 9.72714 7.00771C11.1822 7.39146 12.1179 8.72923 12.0268 10.1539C11.9909 10.7159 11.4252 10.9767 10.969 10.8564C10.4737 10.7258 10.2597 10.2469 10.2324 9.87205C10.1935 9.33743 9.81666 8.86234 9.26206 8.71607ZM16.3671 14.9268C16.17 14.5422 15.7892 14.2404 15.3308 14.1195L10.6411 12.8827C10.1826 12.7618 9.69947 12.8357 9.33352 13.0718C8.95878 13.3135 8.70829 13.7284 8.7613 14.2422C8.93054 15.8827 10.1055 17.3278 11.821 17.7802C13.5365 18.2326 15.2881 17.5594 16.2681 16.222C16.575 15.8031 16.5688 15.3205 16.3671 14.9268Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M20.5 4C19.9477 4 19.5 4.44772 19.5 5V6.5H18C17.4477 6.5 17 6.94771 17 7.5C17 8.05228 17.4477 8.5 18 8.5H19.5V10C19.5 10.5523 19.9477 11 20.5 11C21.0523 11 21.5 10.5523 21.5 10V8.5H23C23.5523 8.5 24 8.05229 24 7.5C24 6.94772 23.5523 6.5 23 6.5H21.5V5C21.5 4.44772 21.0523 4 20.5 4Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className=" hover:bg-[rgba(255,255,255,0.05)] p-1">
                        <svg
                          ariaHidden="true"
                          role="img"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className=" self-center m-[2.5px] opacity-60"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="h-[42px] aspect-square rounded-full relative cursor-pointer"
                        style={{
                          backgroundColor: `hsl(${
                            parseInt(message.from[0], 36) * 23 +
                            parseInt(message.from[1], 36)
                          },81%,60%)`,
                        }}
                      >
                        <img
                          src="/discord.png"
                          className="h-full w-full object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p>
                        <span className="px-2 font-bold">
                          {message.username}
                        </span>
                        <span className="text-xs opacity-50 font-light">
                          Aujourd'hui à 00:00
                        </span>
                      </p>
                      <p className="opacity-80 px-2">{message.content}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <Commands />
        </div>
        <div className="w-full h-[68px] px-4 pb-5">
          <Input />
        </div>
      </div>
    </div>
  );
};

export default Home;
