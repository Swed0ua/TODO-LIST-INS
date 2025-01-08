import React, { useState } from 'react';
import { InputTypes } from '../../../types/userModel';

interface InputProps { type: InputTypes; label: string, idName:string, value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }

const Input: React.FC<InputProps> = ({ type, label, idName, value, onChange}) => { 
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={idName}>
            {label}
          </label>
          <input
            type={type}
            name={idName}
            id={idName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={onChange}
          />
        </div>
    )
}

export default Input;
