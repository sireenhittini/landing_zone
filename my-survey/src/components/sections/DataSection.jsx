// src/components/sections/DataSection.jsx
import React, { useState } from 'react';

export default function DataSection({ fieldsetClass = '', icon = null }) {
  // Section: Data (14 questions)
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q6Note, setQ6Note] = useState('');
  const [q7, setQ7] = useState('');
  const [q8, setQ8] = useState('');
  const [q9, setQ9] = useState('');
  const [q10, setQ10] = useState('');
  const [q11, setQ11] = useState('');
  const [q12, setQ12] = useState('');
  const [q12Note, setQ12Note] = useState('');
  const [q13, setQ13] = useState('');
  const [q13Note, setQ13Note] = useState('');
  const [q14, setQ14] = useState('');

  return (
    <fieldset className={`${fieldsetClass} bg-white p-6 rounded-lg shadow-sm`}>
      <legend className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">Data</span>
      </legend>
      <div className="space-y-4">
        {/* Q1 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            1. What are the customer’s data requirements?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q1}
            onChange={e => setQ1(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q2 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            2. Is real-time processing needed?
          </label>
          <div className="flex space-x-6">
            {['Yes','No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="q2"
                  value={opt}
                  checked={q2===opt}
                  onChange={e => setQ2(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Q3 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            3. Any data retention/archive policies?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q3}
            onChange={e => setQ3(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q4 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            4. Preferred storage/database technology?
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={q4}
            onChange={e => setQ4(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q5 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            5. Is there a migration scope for existing data?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q5}
            onChange={e => setQ5(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q6 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            6. Integration with other systems required?
          </label>
          <div className="flex space-x-6">
            {['Yes','No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="q6"
                  value={opt}
                  checked={q6===opt}
                  onChange={e => setQ6(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {q6==='Yes' && (
            <textarea
              rows={2}
              className="mt-2 w-full border rounded px-3 py-2"
              value={q6Note}
              onChange={e => setQ6Note(e.target.value)}
              placeholder="Please specify"
            />
          )}
        </div>
        {/* Q7 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            7. Expected access patterns? (Read-heavy, Write-heavy, Balanced)
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={q7}
            onChange={e => setQ7(e.target.value)}
          >
            <option value="" disabled>– Select –</option>
            <option>Read-heavy</option>
            <option>Write-heavy</option>
            <option>Balanced</option>
          </select>
        </div>
        {/* Q8 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            8. Is data replication needed across locations?
          </label>
          <div className="flex space-x-6">
            {['Yes','No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="q8"
                  value={opt}
                  checked={q8===opt}
                  onChange={e => setQ8(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">" + opt + "</span>
              </label>
            ))}
          </div>
        </div>
        {/* Q9 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            9. Compliance/regulatory needs?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q9}
            onChange={e => setQ9(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q10 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            10. Backup and disaster recovery strategy?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q10}
            onChange={e => setQ10(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q11 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            11. Data transformation or cleansing needs?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q11}
            onChange={e => setQ11(e.target.value)}
            placeholder="Your answer"
          />
        </div>
        {/* Q12 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            12. How will accuracy/quality be ensured?
          </label>
          <div className="flex space-x-6">
            {['Yes','No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="q12"
                  value={opt}
                  checked={q12===opt}
                  onChange={e => setQ12(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">" + opt + "</span>
              </label>
            ))}
          </div>
          {q12==='Yes' && (
            <textarea
              rows={2}
              className="mt-2 w-full border rounded px-3 py-2"
              value={q12Note}
              onChange={e => setQ12Note(e.target.value)}
              placeholder="Please explain"
            />
          )}
        </div>
        {/* Q13 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            13. Plans for data growth?
          </label>
          <div className="flex space-x-6">
            {['Yes','No'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="q13"
                  value={opt}
                  checked={q13===opt}
                  onChange={e => setQ13(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">" + opt + "</span>
              </label>
            ))}
          </div>
          {q13==='Yes' && (
            <textarea
              rows={2}
              className="mt-2 w-full border rounded px-3 py-2"
              value={q13Note}
              onChange={e => setQ13Note(e.target.value)}
              placeholder="Please explain"
            />
          )}
        </div>
        {/* Q14 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            14. Current data-related pain points?
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
            value={q14}
            onChange={e => setQ14(e.target.value)}
            placeholder="Your answer"
          />
        </div>
      </div>
    </fieldset>
  );
}
