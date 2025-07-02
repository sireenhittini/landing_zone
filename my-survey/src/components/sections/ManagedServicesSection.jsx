// src/components/sections/ManagedServicesSection.jsx
import React, { useState } from 'react';
export default function ManagedServicesSection() {
  const [drivers, setDrivers] = useState("");
  return (
    <fieldset className="border p-6 rounded-lg">
      <legend className="text-lg font-semibold mb-4">Managed Services</legend>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          1. What are the drivers for seeking managed services?
        </label>
        <textarea
          rows={2}
          className="w-full border rounded px-3 py-2 mt-1"
          value={drivers}
          onChange={e => setDrivers(e.target.value)}
          placeholder="Your answer"
        />
      </div>
      {/* Add Q2–Q11 here */}
    </fieldset>
  );
}
