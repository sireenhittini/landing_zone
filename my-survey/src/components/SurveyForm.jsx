// src/components/SurveyForm.jsx
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { formatEmailBody } from './EmailFormatter';

// read in your env values
const FUNCTION_URL = import.meta.env.VITE_EMAIL_FUNCTION_URL;
const EMAIL_TO     = import.meta.env.VITE_EMAIL_TO || 'siren.hittini@zaintech.com';

export default function SurveyForm() {
  // State for each of the 15 fields
  const [customerName, setCustomerName] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [detailedRequirement, setDetailedRequirement] = useState('');
  const [primaryGoals, setPrimaryGoals] = useState([]);
  const [otherPrimary, setOtherPrimary] = useState('');
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
  const [legacyIntegration, setLegacyIntegration] = useState('');
  const [azureServices, setAzureServices] = useState([]);
  const [otherAzure, setOtherAzure] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  // NEW: submission state for disabling button
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const toggle = (arr, setter, val) => {
    setter(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const validate = () => {
    const newErrors = {};
    ['customerName','projectScope','detailedRequirement','businessPOC','technicalPOC','startDate','endDate','milestones','submissionDate'].forEach(field => {
      if (!eval(field)) newErrors[field] = true;
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
      primaryGoals: primaryGoals.join(', '),
      otherPrimary,
      complianceStandards: complianceStandards.join(', '),
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
      azureServices: azureServices.join(', '),
      otherAzure,
      submissionDate
    }, EMAIL_TO);

    const payload = {
      name:        EMAIL_TO,
      email:       EMAIL_TO,
      toEmail:     EMAIL_TO,
      companyName: 'ZainTECH',
      message:     emailBody
    };

    try {
      const res = await fetch(FUNCTION_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
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
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          ZainTECH – Azure Landing Zone Discovery Form
        </h2>

        <div className="space-y-4">
          {/* 1. Customer Name */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Customer Name
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Scope of the Project
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Detailed Requirement
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Primary Goals for Moving to Azure
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Cost Optimization',
                'Regulatory Compliance',
                'Modernize Legacy Systems',
                'Disaster Recovery',
                'Scalability & Performance',
                'Cybersecurity',
                'Other'
              ].map(goal => (
                <label key={goal} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={primaryGoals.includes(goal)}
                    onChange={() =>
                      toggle(primaryGoals, setPrimaryGoals, goal)
                    }
                  />
                  <span className="ml-2 text-gray-700">{goal}</span>
                </label>
              ))}
            </div>
            {primaryGoals.includes('Other') && (
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please specify"
                value={otherPrimary}
                onChange={e => setOtherPrimary(e.target.value)}
              />
            )}
          </div>

          {/* 5. Compliance Standards to Meet */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Compliance Standards to Meet
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Kuwait Cybersecurity Law',
                'ISO 27001',
                'PCI DSS',
                'GDPR',
                'Other'
              ].map(std => (
                <label key={std} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={complianceStandards.includes(std)}
                    onChange={() =>
                      toggle(complianceStandards, setComplianceStandards, std)
                    }
                  />
                  <span className="ml-2 text-gray-700">{std}</span>
                </label>
              ))}
            </div>
            {complianceStandards.includes('Other') && (
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please specify"
                value={otherCompliance}
                onChange={e => setOtherCompliance(e.target.value)}
              />
            )}
          </div>

          {/* 6. Business Point of Contact */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Business Point of Contact (Name, Role, Email, Phone)
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Technical Point of Contact (Name, Role, Email, Phone)
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
              Anticipated Project Start and End Dates
            </label>
            <input
              type="date"
              className="block w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>

         {/* 9. Critical Project Milestones */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Critical Project Milestones
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Budget Allocation
            </label>
            <div className="flex justify-center space-x-4">
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              RFP Process Required?
            </label>
            <div className="flex justify-center space-x-4">
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Onsite or Offsite Work Required?
            </label>
            <div className="flex justify-center space-x-4">
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Legacy/On-Prem Systems Requiring Integration
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
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Azure Services Already in Use (if any)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Azure Active Directory',
                'Azure Sentinel',
                'Azure Virtual Machines',
                'Azure Policy',
                'None',
                'Other'
              ].map(svc => (
                <label key={svc} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                    checked={azureServices.includes(svc)}
                    onChange={() => toggle(azureServices, setAzureServices, svc)}
                  />
                  <span className="ml-2 text-gray-700">{svc}</span>
                </label>
              ))}
            </div>
            {azureServices.includes('Other') && (
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please specify"
                value={otherAzure}
                onChange={e => setOtherAzure(e.target.value)}
              />
            )}
          </div>

          {/* 15. Date of Submission */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-medium mb-1">
              Date of Submission
            </label>
            <input
              type="date"
              className="block w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={submissionDate}
              onChange={e => setSubmissionDate(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
         <button
          type="submit"
          disabled={submitting}
          className={`w-full ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg mt-6`}
        >
          {submitting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
