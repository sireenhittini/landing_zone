import React from 'react';

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: boolean;
};

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  error = false
}: FormInputProps) {
  return (
    <div className="mb-8 text-left">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-4">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
      />
    </div>
  );
}
