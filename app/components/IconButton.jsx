"use client";

import React from "react";

const IconButton = ({ icon, children, ...props }) => {
  return (
    <button className="flex items-center gap-2 p-2 rounded hover:bg-gary-100 cursor-pointer" {...props} >
      {icon}
      {children}
    </button>
  );
};

export default IconButton;