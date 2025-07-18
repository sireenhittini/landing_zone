import React from 'react';

type FormTextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
};

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder = '',
  error = false,
  required = false
}: FormTextareaProps) {
  return (
    <div className="mb-8 text-left">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-4">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
    </div>
  );
}
