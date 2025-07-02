// src/components/sections/K8sSection.jsx
import React, { useState } from 'react';

export default function K8sSection({ fieldsetClass = '', icon = null }) {
  // Section: K8s Platform Implementation (7 questions)
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');

  return (
    <fieldset className={`${fieldsetClass} bg-white p-6 rounded-lg shadow-sm`}>
      <legend className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">K8s Platform Implementation</span>
      </legend>

      {/* Q1 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          1. What version of Kubernetes is to be deployed?
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={q1}
          onChange={e => setQ1(e.target.value)}
          placeholder="e.g. 1.27.1"
        />
      </div>

      {/* Q2 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          2. Where is the deployment planned (on-prem/cloud)?
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={q2}
          onChange={e => setQ2(e.target.value)}
        >
          <option value="" disabled>– Select –</option>
          <option value="On-Prem">On-Prem</option>
          <option value="Cloud">Cloud</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Q3 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          3. Is sizing completed for master/worker nodes?
        </label>
        <textarea
          rows={2}
          className="w-full border rounded px-3 py-2"
          value={q3}
          onChange={e => setQ3(e.target.value)}
          placeholder="e.g. 3 masters (4 vCPU, 16GB), 5 workers"
        />
      </div>

      {/* Q4 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          4. How many environments will be implemented?
        </label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={q4}
          onChange={e => setQ4(e.target.value)}
          placeholder="e.g. 3 (dev, qa, prod)"
        />
      </div>

      {/* Q5 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          5. Is post-implementation support required from Adfolks?
        </label>
        <div className="flex space-x-6">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="radio"
                name="postSupport"
                value={opt}
                checked={q5 === opt}
                onChange={e => setQ5(e.target.value)}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q6 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          6. Is there a need for additional DevOps tools?
        </label>
        <div className="flex space-x-6">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="radio"
                name="additionalTools"
                value={opt}
                checked={q6 === opt}
                onChange={e => setQ6(e.target.value)}
                className="form-radio h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Q7 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          7. Any other Kubernetes-related requirements?
        </label>
        <textarea
          rows={3}
          className="w-full border rounded px-3 py-2"
          value={q7}
          onChange={e => setQ7(e.target.value)}
          placeholder="Your answer"
        />
      </div>
    </fieldset>
  );
}
