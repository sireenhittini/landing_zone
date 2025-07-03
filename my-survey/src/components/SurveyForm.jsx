// src/components/SurveyForm.jsx
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { formatEmailBody } from './EmailFormatter';
 
// read in your env values
const FUNCTION_URL = import.meta.env.VITE_EMAIL_FUNCTION_URL;
const EMAIL_TO = import.meta.env.VITE_EMAIL_TO || 'siren.hittini@zaintech.com';
 
export default function SurveyForm() {
  // State for each of the 15 fields
  const [customerName, setCustomerName] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [detailedRequirement, setDetailedRequirement] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [otherPrimary, setOtherPrimary] = useState('');
  const [complianceStandard, setComplianceStandard] = useState('');
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
  const [legacyIntegration, setLegacyIntegration] = useState('');
  const [azureService, setAzureService] = useState('');
  const [otherAzureService, setOtherAzureService] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
 
  // enforce dates ≥ today
  const today = new Date().toISOString().split('T')[0];
 
  // submission state for disabling button
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
 
  const validate = () => {
    const newErrors = {};
    const requiredFields = {
      customerName,
      projectScope,
      detailedRequirement,
      businessPOC,
      technicalPOC,
      startDate,
      endDate,
      milestones,
      submissionDate
    };
   
    Object.entries(requiredFields).forEach(([fieldName, value]) => {
      if (!value || value.trim() === '') {
        newErrors[fieldName] = true;
      }
    });
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all required fields.');
      return;
    }
 
    setSubmitting(true);
    toast.success('Sending your responses…');
 
    // build email body
    const emailBody = formatEmailBody({
      customerName,
      projectScope,
      detailedRequirement,
      primaryGoal,
      otherPrimary,
      complianceStandard,
      otherCompliance,
      businessPOC,
      technicalPOC,
      startDate,
      endDate,
      milestones,
      budgetAllocation,
      budgetRange,
      rfpProcess,
      rfpDetails,
      workLocation,
      legacyIntegration,
      azureService,
      otherAzureService,
      submissionDate
    }, EMAIL_TO);
 
    const payload = {
      name: EMAIL_TO,
      email: EMAIL_TO,
      toEmail: EMAIL_TO,
      companyName: 'ZainTECH',
      message: emailBody
    };
 
    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text() || res.statusText);
      toast.success('Email sent successfully!');
      // Optionally reset form here
    } catch (err) {
      console.error(err);
      toast.error(`Failed to send email: ${err.message}`);
    } finally {
      setTimeout(() => setSubmitting(false), 2000);
    }
  };
 
  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="h-16 drop-shadow-lg"
        />
      </div>
 
{/* Title */}
<h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 whitespace-nowrap">
  Azure Landing Zone Discovery Form
</h2>


      <div className="space-y-8">
        {/* 1. Customer Name */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            1. Customer Name
          </label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />
        </div>
 
        {/* 2. Scope of the Project */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            2. Scope of the Project
          </label>
          <textarea
            rows={3}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please outline the project’s objectives, deliverables, and boundaries."
            value={projectScope}
            onChange={e => setProjectScope(e.target.value)}
          />
        </div>
 
        {/* 3. Detailed Requirement */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            3. Detailed Requirement
          </label>
          <textarea
            rows={3}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Technical, functional, and operational requirements."
            value={detailedRequirement}
            onChange={e => setDetailedRequirement(e.target.value)}
          />
        </div>
 
        {/* 4. Primary Goals for Moving to Azure */}
        <div className="mb-10 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            4. Primary Goals for Moving to Azure
          </label>
          <select
            value={primaryGoal}
            onChange={e => setPrimaryGoal(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              — Select a primary goal —
            </option>
            <option value="Cost Optimization">Cost Optimization</option>
            <option value="Regulatory Compliance">Regulatory Compliance</option>
            <option value="Modernize Legacy Systems">Modernize Legacy Systems</option>
            <option value="Disaster Recovery">Disaster Recovery</option>
            <option value="Scalability & Performance">Scalability & Performance</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Other">Other</option>
          </select>
 
          {primaryGoal === 'Other' && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please specify"
              value={otherPrimary}
              onChange={e => setOtherPrimary(e.target.value)}
            />
          )}
        </div>
 
        {/* 5. Compliance Standards to Meet */}
        <div className="mb-10 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            5. Compliance Standards to Meet
          </label>
          <select
            value={complianceStandard}
            onChange={e => setComplianceStandard(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>— Select a standard —</option>
            <option value="Kuwait Cybersecurity Law">Kuwait Cybersecurity Law</option>
            <option value="ISO 27001">ISO 27001</option>
            <option value="PCI DSS">PCI DSS</option>
            <option value="GDPR">GDPR</option>
            <option value="Other">Other</option>
          </select>
 
          {complianceStandard === 'Other' && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please specify"
              value={otherCompliance}
              onChange={e => setOtherCompliance(e.target.value)}
            />
          )}
        </div>
 
        {/* 6. Business Point of Contact */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            6. Business Point of Contact (Name, Role, Email, Phone)
          </label>
          <textarea
            rows={2}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Name, Role, Email, Phone"
            value={businessPOC}
            onChange={e => setBusinessPOC(e.target.value)}
          />
        </div>
 
        {/* 7. Technical Point of Contact */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-4">
            7. Technical Point of Contact (Name, Role, Email, Phone)
          </label>
          <textarea
            rows={2}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Name, Role, Email, Phone"
            value={technicalPOC}
            onChange={e => setTechnicalPOC(e.target.value)}
          />
        </div>
 
        {/* 8. Anticipated Project Start and End Dates */}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            8. Anticipated Project Start and End Dates
          </label>
 
          {/* Start Date with inline label */}
          <div className="relative">
            <input
              type="date"
              min={today}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full pl-28 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              Start Date
            </span>
          </div>
 
          {/* End Date with inline label */}
          <div className="relative mt-2">
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full pl-28 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              End Date
            </span>
          </div>
        </div>
 
        {/* 9. Critical Project Milestones */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            9. Critical Project Milestones
          </label>
          <textarea
            rows={2}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="List major phases or deadlines"
            value={milestones}
            onChange={e => setMilestones(e.target.value)}
          />
        </div>
 
        {/* 10. Budget Allocation */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            10. Budget Allocation
          </label>
          <div className="flex justify-start space-x-4">
            {['Yes', 'No', 'Not yet determined'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="budget"
                  className="form-radio accent-blue-600"
                  value={opt}
                  checked={budgetAllocation === opt}
                  onChange={e => setBudgetAllocation(e.target.value)}
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {budgetAllocation === 'Yes' && (
            <input
              type="text"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Estimated budget range"
              value={budgetRange}
              onChange={e => setBudgetRange(e.target.value)}
            />
          )}
        </div>
 
        {/* 11. RFP Process Required? */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            11. RFP Process Required?
          </label>
          <div className="flex justify-start space-x-4">
            {['Yes', 'No', 'Not sure'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="rfp"
                  className="form-radio accent-blue-600"
                  value={opt}
                  checked={rfpProcess === opt}
                  onChange={e => setRfpProcess(e.target.value)}
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {rfpProcess === 'Yes' && (
            <textarea
              rows={2}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe timeline & vendor process"
              value={rfpDetails}
              onChange={e => setRfpDetails(e.target.value)}
            />
          )}
        </div>
 
        {/* 12. Onsite or Offsite Work Required? */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            12. Onsite or Offsite Work Required?
          </label>
          <div className="flex justify-start space-x-4">
            {['Onsite (Kuwait)', 'Offsite (Remote)', 'Hybrid'].map(opt => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  className="form-radio accent-blue-600"
                  value={opt}
                  checked={workLocation === opt}
                  onChange={e => setWorkLocation(e.target.value)}
                />
                <span className="ml-2 text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
 
        {/* 13. Legacy/On-Prem Systems Requiring Integration */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            13. Legacy/On-Prem Systems Requiring Integration
          </label>
          <textarea
            rows={2}
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. SCADA, ERP, core banking"
            value={legacyIntegration}
            onChange={e => setLegacyIntegration(e.target.value)}
          />
        </div>
 
        {/* 14. Azure Services Already in Use (if any) */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            14. Azure Services Already in Use (if any)
          </label>
          <select
            value={azureService}
            onChange={e => setAzureService(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>— Select a service —</option>
            <option value="Azure Active Directory">Azure Active Directory</option>
            <option value="Azure Sentinel">Azure Sentinel</option>
            <option value="Azure Virtual Machines">Azure Virtual Machines</option>
            <option value="Azure Policy">Azure Policy</option>
            <option value="None">None</option>
            <option value="Other">Other</option>
          </select>
 
          {azureService === 'Other' && (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please specify"
              value={otherAzureService}
              onChange={e => setOtherAzureService(e.target.value)}
            />
          )}
        </div>
 
        {/* 15. Date of Submission */}
        <div className="mb-8 text-left">
          <label className="block text-gray-700 font-medium mb-1">
            15. Date of Submission
          </label>
          <input
            type="date"
            className="block w-full border border-gray-300 rounded-md px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={submissionDate}
            onChange={e => setSubmissionDate(e.target.value)}
          />
        </div>
 
        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg mt-6`}
        >
          {submitting ? 'Sending...' : 'Submit Request'}
        </button>
      </div>
      </form>
    </div>
  );
}
 