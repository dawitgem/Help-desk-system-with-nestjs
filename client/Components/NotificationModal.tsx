import React from "react";

const NotificationModal = () => {
  const notification = false;

  return (
    <div className=" ">
      <div className="p-4 text-gray-700 text-sm w-full bg-slate-100 border border-gray-300">
        <p>Notifications</p>
      </div>
      <div className="bg-white min-h-[200px] flex flex-col align-middle justify-center">
        {notification ? (
          <div></div>
        ) : (
          <p className="self-center justify-self-center text-sm text-gray-600">
            No notification yet
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
