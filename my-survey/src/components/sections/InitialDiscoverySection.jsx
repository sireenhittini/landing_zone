// src/components/sections/InitialDiscoverySection.jsx
import React, { useState } from 'react';

export default function InitialDiscoverySection({ fieldsetClass = '', icon = null }) {
  // Initial form (15 questions)
  const [customerName, setCustomerName] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [detailedRequirement, setDetailedRequirement] = useState('');
  const [primaryGoals, setPrimaryGoals] = useState([]);
  const [otherPrimaryGoal, setOtherPrimaryGoal] = useState('');
  const [complianceStandards, setComplianceStandards] = useState([]);
  const [otherCompliance, setOtherCompliance] = useState('');
  const [businessPOC, setBusinessPOC] = useState('');
  const [technicalPOC, setTechnicalPOC] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [milestones, setMilestones] = useState('');
  const [budgetAllocation, setBudgetAllocation] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [rfpProcess, setRfpProcess] = useState('');
  const [rfpDetails, setRfpDetails] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [legacySystems, setLegacySystems] = useState('');
  const [azureServices, setAzureServices] = useState([]);
  const [otherAzureService, setOtherAzureService] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  const toggleArray = (arr, setArr, value) => {
    setArr(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  return (
    <fieldset className={`${fieldsetClass} bg-white p-6 rounded-lg shadow-sm`}>  
      <legend className="text-xl font-semibold mb-4 flex items-center">
        {icon}
        <span className="ml-2">Azure Landing Zone Discovery</span>
      </legend>
      <div className="space-y-6">
        {/* Q1 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">1. Customer Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter customer name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
        </div>
        {/* Q2 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">2. Scope of the Project</label>
          <textarea rows={3} className="w-full border rounded px-3 py-2" placeholder="Please outline the project’s objectives, deliverables, and boundaries." value={projectScope} onChange={e => setProjectScope(e.target.value)} />
        </div>
        {/* Q3 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">3. Detailed Requirement</label>
          <textarea rows={3} className="w-full border rounded px-3 py-2" placeholder="Technical, functional, and operational requirements." value={detailedRequirement} onChange={e => setDetailedRequirement(e.target.value)} />
        </div>
        {/* Q4 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">4. Primary Goals for Moving to Azure (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {['Cost Optimization','Regulatory Compliance','Modernize Legacy Systems','Disaster Recovery','Scalability & Performance','Cybersecurity','Other'].map(goal => (
              <label key={goal} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" checked={primaryGoals.includes(goal)} onChange={() => toggleArray(primaryGoals, setPrimaryGoals, goal)} />
                <span className="ml-2 text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
          {primaryGoals.includes('Other') && (
            <input type="text" className="mt-2 w-full border rounded px-3 py-2" placeholder="Please specify" value={otherPrimaryGoal} onChange={e => setOtherPrimaryGoal(e.target.value)} />
          )}
        </div>
        {/* Q5 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">5. Compliance Standards to Meet (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {['Kuwait Cybersecurity Law','ISO 27001','PCI DSS','GDPR','Other'].map(std => (
              <label key={std} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" checked={complianceStandards.includes(std)} onChange={() => toggleArray(complianceStandards, setComplianceStandards, std)} />
                <span className="ml-2 text-gray-700">{std}</span>
              </label>
            ))}
          </div>
          {complianceStandards.includes('Other') && (
            <input type="text" className="mt-2 w-full border rounded px-3 py-2" placeholder="Please specify" value={otherCompliance} onChange={e => setOtherCompliance(e.target.value)} />
          )}
        </div>
        {/* Q6 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">6. Business Point of Contact (Name, Role, Email, Phone)</label>
          <textarea rows={2} className="w-full border rounded px-3 py-2" placeholder="Name, Role, Email, Phone" value={businessPOC} onChange={e => setBusinessPOC(e.target.value)} />
        </div>
        {/* Q7 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">7. Technical Point of Contact (Name, Role, Email, Phone)</label>
          <textarea rows={2} className="w-full border rounded px-3 py-2" placeholder="Name, Role, Email, Phone" value={technicalPOC} onChange={e => setTechnicalPOC(e.target.value)} />
        </div>
        {/* Q8 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">8. Anticipated Project Start Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <label className="block text-gray-700 font-medium mt-4 mb-1">End Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        {/* Q9 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">9. Critical Project Milestones</label>
          <textarea rows={2} className="w-full border rounded px-3 py-2" placeholder="Please list major phases or deadlines." value={milestones} onChange={e => setMilestones(e.target.value)} />
        </div>
        {/* Q10 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">10. Budget Allocation</label>
          <div className="flex space-x-6">
            {['Yes','No','Not yet determined'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input type="radio" name="budgetAllocation" className="form-radio" value={opt} checked={budgetAllocation===opt} onChange={e => setBudgetAllocation(e.target.value)} />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {budgetAllocation==='Yes' && (
            <input type="text" className="mt-2 w-full border rounded px-3 py-2" placeholder="Estimated budget range" value={budgetRange} onChange={e => setBudgetRange(e.target.value)} />
          )}
        </div>
        {/* Q11 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">11. RFP Process Required?</label>
          <div className="flex space-x-6">
            {['Yes','No','Not sure'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input type="radio" name="rfpProcess" className="form-radio" value={opt} checked={rfpProcess===opt} onChange={e => setRfpProcess(e.target.value)} />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {rfpProcess==='Yes' && (
            <textarea rows={2} className="mt-2 w-full border rounded px-3 py-2" placeholder="Describe timeline and vendor selection process." value={rfpDetails} onChange={e => setRfpDetails(e.target.value)} />
          )}
        </div>
        {/* Q12 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">12. Onsite or Offsite Work Required?</label>
          {['Onsite (customer location in Kuwait)','Offsite (remote delivery)','Hybrid'].map(opt => (
            <label key={opt} className="inline-flex items-center mr-4">
              <input type="radio" name="workLocation" className="form-radio" value={opt} checked={workLocation===opt} onChange={e => setWorkLocation(e.target.value)} />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        {/* Q13 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">13. Legacy or On-Prem Systems Requiring Integration</label>
          <textarea rows={2} className="w-full border rounded px-3 py-2" placeholder="Examples: SCADA, ERP, core banking, data center workloads." value={legacySystems} onChange={e => setLegacySystems(e.target.value)} />
        </div>
        {/* Q14 */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">14. Azure Services Already in Use (if any)</label>
          <div className="grid grid-cols-2 gap-2">
            {['Azure Active Directory','Azure Sentinel','Azure Virtual Machines','Azure Policy','None','Other'].map(svc => (
              <label key={svc} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" checked={azureServices.includes(svc)} onChange={() => toggleArray(azureServices, setAzureServices, svc)} />
                <span className="ml-2 text-gray-700">{svc}</span>
              </label>
            ))}
          </div>
          {azureServices.includes('Other') && (
            <input type="text" className="mt-2 w-full border rounded px-3 py-2" placeholder="Please specify" value={otherAzureService} onChange={e => setOtherAzureService(e.target.value)} />
          )}
        </div>
        {/* Q15 */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">15. Date of Submission</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={submissionDate} onChange={e => setSubmissionDate(e.target.value)} />
        </div>
      </div>
    </fieldset>
  );
}
