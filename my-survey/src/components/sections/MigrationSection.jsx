// src/components/sections/MigrationSection.jsx
import React, { useState } from 'react';

export default function MigrationSection({
  fieldsetClass = '',
  icon = null
}) {
  const [reasons, setReasons] = useState('');
  const [challenges, setChallenges] = useState('');
  const [perfSec, setPerfSec] = useState('');

  return (
    <fieldset className={fieldsetClass}>
      <legend className="text-lg font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">Migrations</span>
      </legend>

      {/* Q1 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          1. Reasons/goals for cloud migration?
        </label>
        <textarea
          rows={2}
          className="w-full border rounded px-3 py-2"
          value={reasons}
          onChange={e => setReasons(e.target.value)}
          placeholder="Your answer"
        />
      </div>

      {/* Q2 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          2. Potential challenges/risks?
        </label>
        <textarea
          rows={2}
          className="w-full border rounded px-3 py-2"
          value={challenges}
          onChange={e => setChallenges(e.target.value)}
          placeholder="Your answer"
        />
      </div>

      {/* Q3 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          3. Have performance & security requirements been defined?
        </label>
        <textarea
          rows={2}
          className="w-full border rounded px-3 py-2"
          value={perfSec}
          onChange={e => setPerfSec(e.target.value)}
          placeholder="Your answer"
        />
      </div>

      {/* Q4 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          4. Desired cloud service model?
        </label>
        <select className="w-full border rounded px-3 py-2" defaultValue="">
          <option value="" disabled>– Select –</option>
          <option>IaaS</option>
          <option>PaaS</option>
          <option>SaaS</option>
        </select>
      </div>

      {/* ...add Q5–Q23 here in the same style... */}
    </fieldset>
  );
}
