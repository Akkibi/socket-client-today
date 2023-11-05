import { useEffect } from "react";

const UserList = ({ users }) => {
  //   useEffect(() => {

  //   }, [users]);

  return (
    <div className="">
      <div className="mb-1 flex items-center px-2 py-1 hover:bg-[rgba(255,255,255,0.1)] group/edit rounded-md cursor-pointer">
        <div className="w-[35px] overflow-hidden aspect-square rounded-full bg-[#5865f2]">
          <img src="/group.png" className="h-full w-full object-cover" alt="" />
        </div>
        <div className="ml-2 opacity-50 group-hover/edit:opacity-90">
          <p>General messages</p>
          <p className="text-xs font-thin">All members</p>
        </div>
      </div>
      {users.map((user) => {
        return (
          <div
            key={user.userID}
            className="mb-1 flex items-center group/edit px-2 py-1 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer"
          >
            <div className="relative">
              <div
                className="w-[35px] aspect-square rounded-full"
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
              <div className="absolute -bottom-1 -right-1 bg-[#797d87] border-[0.25rem] border-solid border-[#2b2d31] rounded-full w-[1.1rem] h-[1.1rem] z-10">
                <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.3rem] h-[0.3rem] bg-black opacity-70"></div>
              </div>
            </div>
            <div className="ml-2 opacity-50 group-hover/edit:opacity-90">
              {user.username}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
