import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { formatEmailBody } from './EmailFormatter';


export default function AzureForm({ user, functionUrl }) {
  const [formData, setFormData] = useState({

    customerName: '',
    projectScope: '',
    detailedRequirement: '',
    primaryGoal: '',
    otherPrimary: '',
    complianceStandard: '',
    otherCompliance: '',
    businessPOC: '',
    technicalPOC: '',
    startDate: '',
    endDate: '',
    milestones: '',
    budgetAllocation: '',
    budgetRange: '',
    rfpProcess: '',
    rfpDetails: '',
    workLocation: '',
    legacyIntegration: '',
    azureService: '',
    otherAzureService: '',
    submissionDate: ''
  });
  function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
}

  

  const [_errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  function validate() {
    const newErrors = {};
    const required = {
      customerName: formData.customerName,
      projectScope: formData.projectScope,
      detailedRequirement: formData.detailedRequirement,
      businessPOC: formData.businessPOC,
      technicalPOC: formData.technicalPOC,
      startDate: formData.startDate,
      endDate: formData.endDate,
      milestones: formData.milestones,
      submissionDate: formData.submissionDate
    };
    Object.entries(required).forEach(([field, value]) => {
      if (!value.trim()) {
        newErrors[field] = true;
      }
    });
    if (formData.primaryGoal === 'Other' && !formData.otherPrimary.trim()) {
      newErrors.otherPrimary = true;
    }
    if (formData.complianceStandard === 'Other' && !formData.otherCompliance.trim()) {
      newErrors.otherCompliance = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    toast.success('Sending your responses…');

    const emailBody = formatEmailBody(formData);

    const payload = {
      name: user.name,
      email: user.username,
      toEmail: import.meta.env.VITE_EMAIL_TO || '',
      subject: `Azure Landing Zone Discovery Survey from: ${user.username}`,
      message: emailBody
    };

    try {
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text() || res.statusText);
      toast.success('Email sent successfully!');
    } catch (err) {
      console.error(err);
      toast.error(`Failed to send email: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }
return (
  <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <Toaster position="top-center" />
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full"
    >
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

      {/* 1. Customer Name */}
      <div className="mb-8 text-left">
        <label className="block text-gray-700 font-medium mb-4">
          1. Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          className="block w-full border border-gray-300 rounded-md px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>


{/* 2. Scope of the Project */}
<div className="mb-8 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    2. Scope of the Project
  </label>
  <textarea
    name="projectScope"
    rows={3}
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="Please outline the project’s objectives, deliverables, and boundaries."
    value={formData.projectScope}
    onChange={handleChange}
  />
</div>


{/* 3. Detailed Requirement */}
<div className="mb-8 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    3. Detailed Requirement
  </label>
  <textarea
    name="detailedRequirement"
    rows={3}
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="Technical, functional, and operational requirements."
    value={formData.detailedRequirement}
    onChange={handleChange}
  />
</div>
{/* 4. Primary Goals for Moving to Azure */}
<div className="mb-10 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    4. Primary Goals for Moving to Azure
  </label>

  <select
    name="primaryGoal"
    value={formData.primaryGoal}
    onChange={handleChange}
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

  {formData.primaryGoal === 'Other' && (
    <input
      name="otherPrimary"
      type="text"
      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Please specify"
      value={formData.otherPrimary}
      onChange={handleChange}
    />
  )}
</div>




 
{/* 5. Compliance Standards to Meet */}
<div className="mb-10 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    5. Compliance Standards to Meet
  </label>
  <select
    name="complianceStandard"
    value={formData.complianceStandard}
    onChange={handleChange}
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

  {formData.complianceStandard === 'Other' && (
    <input
      name="otherCompliance"
      type="text"
      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Please specify"
      value={formData.otherCompliance}
      onChange={handleChange}
    />
  )}
</div>


{/* 6. Business Point of Contact */}
<div className="mb-8 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    6. Business Point of Contact (Name, Role, Email, Phone)
  </label>
  <textarea
    name="businessPOC"
    rows={2}
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="Name, Role, Email, Phone"
    value={formData.businessPOC}
    onChange={handleChange}
  />
</div>

{/* 7. Technical Point of Contact */}
<div className="mb-8 text-left">
  <label className="block text-gray-700 font-medium mb-4">
    7. Technical Point of Contact (Name, Role, Email, Phone)
  </label>
  <textarea
    name="technicalPOC"
    rows={2}
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="Name, Role, Email, Phone"
    value={formData.technicalPOC}
    onChange={handleChange}
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
      name="startDate"
      min={today}
      value={formData.startDate}
      onChange={handleChange}
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
      name="endDate"
      min={formData.startDate}
      value={formData.endDate}
      onChange={handleChange}
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
    name="milestones"
    rows={2}
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="List major phases or deadlines"
    value={formData.milestones}
    onChange={handleChange}
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
          name="budgetAllocation"
          className="form-radio accent-blue-600"
          value={opt}
          checked={formData.budgetAllocation === opt}
          onChange={handleChange}
        />
        <span className="ml-2 text-gray-700">{opt}</span>
      </label>
    ))}
  </div>

  {formData.budgetAllocation === 'Yes' && (
    <input
      type="text"
      name="budgetRange"
      className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Estimated budget range"
      value={formData.budgetRange}
      onChange={handleChange}
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
          name="rfpProcess"
          className="form-radio accent-blue-600"
          value={opt}
          checked={formData.rfpProcess === opt}
          onChange={handleChange}
        />
        <span className="ml-2 text-gray-700">{opt}</span>
      </label>
    ))}
  </div>
  {formData.rfpProcess === 'Yes' && (
    <textarea
      rows={2}
      name="rfpDetails"
      className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-2
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Describe timeline & vendor process"
      value={formData.rfpDetails}
      onChange={handleChange}
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
          checked={formData.workLocation === opt}
          onChange={handleChange}
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
    name="legacyIntegration"
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="e.g. SCADA, ERP, core banking"
    value={formData.legacyIntegration}
    onChange={handleChange}
  />
</div>


{/* 14. Azure Services Already in Use (if any) */}
<div className="mb-8 text-left">
  <label className="block text-gray-700 font-medium mb-1">
    14. Azure Services Already in Use (if any)
  </label>
  <select
    name="azureService"
    value={formData.azureService}
    onChange={handleChange}
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

  {formData.azureService === 'Other' && (
    <input
      type="text"
      name="otherAzureService"
      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Please specify"
      value={formData.otherAzureService}
      onChange={handleChange}
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
    name="submissionDate"
    className="block w-full border border-gray-300 rounded-md px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    value={formData.submissionDate}
    onChange={handleChange}
  />
</div>



{/* Submit Button */}
<button
  type="submit"
  disabled={submitting}
  className={`w-full ${
    submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
  } text-white font-semibold py-3 rounded-lg mt-6`}
>
  {submitting ? 'Sending...' : 'Submit Request'}
</button>
</form>
</div>
);
}