import React from "react";

interface MainBtnProps { children: React.ReactNode; onClick:()=>void, addClassName?: string; }

const MainBtn: React.FC<MainBtnProps> = ({children, onClick, addClassName}) => {
  return (
    <button onClick={onClick} className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all duration-200 ${addClassName && addClassName}`}>{children}</button>
  );
};

export default MainBtn;
