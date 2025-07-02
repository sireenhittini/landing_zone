// src/components/sections/DevOpsSection.jsx
import React, { useState } from 'react';

export default function DevOpsSection({ fieldsetClass = '', icon = null }) {
  // Section: DevOps (10 questions)
  const [processDesc, setProcessDesc] = useState('');
  const [ciCd, setCiCd] = useState('');
  const [tools, setTools] = useState('');
  const [goals, setGoals] = useState('');
  const [teamStructure, setTeamStructure] = useState('');
  const [dedicatedRoles, setDedicatedRoles] = useState('');
  const [automationParts, setAutomationParts] = useState('');
  const [manualTasks, setManualTasks] = useState('');
  const [releaseFreq, setReleaseFreq] = useState('');
  const [releaseMgmt, setReleaseMgmt] = useState('');

  return (
    <fieldset className={`${fieldsetClass} bg-white p-6 rounded-lg shadow-sm`}>
      <legend className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">DevOps</span>
      </legend>
      <div className="space-y-6">
        {/* Q1 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            1. Describe the current software development/deployment process.
          </label>
          <textarea
            rows={3}
            className="w-full border rounded px-3 py-2"
            value={processDesc}
            onChange={e => setProcessDesc(e.target.value)}
            placeholder="Your answer"
          />
        </div>

        {/* Q2 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            2. Is CI/CD automation in place?
          </label>
          <div className="flex space-x-6">
            {['Yes', 'No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="ciCd"
                  value={opt}
                  checked={ciCd === opt}
                  onChange={e => setCiCd(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            3. What tools are used across development, testing & deployment?
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={tools}
            onChange={e => setTools(e.target.value)}
            placeholder="e.g. Jenkins, GitLab, Azure DevOps"
          />
        </div>

        {/* Q4 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            4. What are your DevOps goals? (speed, collaboration, etc.)
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={goals}
            onChange={e => setGoals(e.target.value)}
            placeholder="Your answer"
          />
        </div>

        {/* Q5 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            5. How are dev, ops, and test teams structured?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={teamStructure}
            onChange={e => setTeamStructure(e.target.value)}
            placeholder="Your answer"
          />
        </div>

        {/* Q6 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            6. Are there dedicated DevOps roles?
          </label>
          <div className="flex space-x-6">
            {['Yes', 'No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="dedicatedRoles"
                  value={opt}
                  checked={dedicatedRoles === opt}
                  onChange={e => setDedicatedRoles(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q7 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            7. Which lifecycle parts are being automated?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={automationParts}
            onChange={e => setAutomationParts(e.target.value)}
            placeholder="Your answer"
          />
        </div>

        {/* Q8 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            8. Are there manual tasks you wish to eliminate?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={manualTasks}
            onChange={e => setManualTasks(e.target.value)}
            placeholder="Your answer"
          />
        </div>

        {/* Q9 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            9. Frequency of releases?
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={releaseFreq}
            onChange={e => setReleaseFreq(e.target.value)}
            placeholder="e.g. Weekly, Bi-weekly"
          />
        </div>

        {/* Q10 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            10. Describe the release management process.
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={releaseMgmt}
            onChange={e => setReleaseMgmt(e.target.value)}
            placeholder="Your answer"
          />
        </div>
      </div>
    </fieldset>
  );
}
