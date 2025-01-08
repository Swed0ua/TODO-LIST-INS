import React, { useState } from 'react';

interface AuthFormBtnProps { txt: string; }

const AuthFormBtn: React.FC<AuthFormBtnProps> = ({txt}) => {
    return (
    <div className="flex items-center justify-between">
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            {txt}
        </button>
    </div>
  );
};

export default AuthFormBtn;
