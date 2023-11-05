import { useEffect } from "react";

const Notification = ({ title, content, onClose }) => {
  useEffect(() => {
    console.log("on mounted");

    setTimeout(onClose, 4000);
  }, []);

  return (
    <div className="">
      <div className="" onClick={onClose}></div>
      <strong>{title}</strong>
      <p>{content}</p>
    </div>
  );
};

export default Notification;
