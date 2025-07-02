// src/components/sections/AppModernisationSection.jsx
import React, { useState } from 'react';

export default function AppModernisationSection({ fieldsetClass = '', icon = null }) {
  // Section: App-Platform Modernisation (6 questions)
  const [appCount, setAppCount] = useState('');
  const [developmentOrigin, setDevelopmentOrigin] = useState('');
  const [hasSourceCode, setHasSourceCode] = useState('');
  const [devLanguages, setDevLanguages] = useState('');
  const [inHouseSupport, setInHouseSupport] = useState('');
  const [devOpsPractices, setDevOpsPractices] = useState('');

  return (
    <fieldset className={`${fieldsetClass} bg-white p-6 rounded-lg shadow-sm`}>
      <legend className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">App-Platform Modernisation</span>
      </legend>

      {/* Q1 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          1. How many applications are scheduled for modernization?
        </label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={appCount}
          onChange={e => setAppCount(e.target.value)}
          placeholder="Enter a number"
        />
      </div>

      {/* Q2 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          2. Were apps developed internally or sourced externally?
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={developmentOrigin}
          onChange={e => setDevelopmentOrigin(e.target.value)}
        >
          <option value="" disabled>– Select –</option>
          <option value="Internal">Internally developed</option>
          <option value="External">Externally sourced</option>
        </select>
      </div>

      {/* Q3 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          3. Is the customer in possession of source code?
        </label>
        <div className="flex space-x-6">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="radio"
                name="hasSourceCode"
                value={opt}
                checked={hasSourceCode === opt}
                onChange={e => setHasSourceCode(e.target.value)}
                className="form-radio h-5 w-5 text-teal-600"
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q4 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          4. Which development languages were used?
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={devLanguages}
          onChange={e => setDevLanguages(e.target.value)}
          placeholder="e.g. Java, .NET, Python"
        />
      </div>

      {/* Q5 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          5. Is there an in-house team for support?
        </label>
        <div className="flex space-x-6">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="radio"
                name="inHouseSupport"
                value={opt}
                checked={inHouseSupport === opt}
                onChange={e => setInHouseSupport(e.target.value)}
                className="form-radio h-5 w-5 text-teal-600"
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q6 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          6. Are there DevOps practices in place? If so, describe the tools and processes.
        </label>
        <textarea
          rows={3}
          className="w-full border rounded px-3 py-2"
          value={devOpsPractices}
          onChange={e => setDevOpsPractices(e.target.value)}
          placeholder="Your answer"
        />
      </div>
    </fieldset>
  );
}
