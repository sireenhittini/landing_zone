import React from 'react';

type FormSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: boolean;
};

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = '— Select —',
  required = false,
  error = false // ✅ Add this
}: FormSelectProps) {
  return (
    <div className="mb-10 text-left">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-4">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
