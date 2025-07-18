// AzureForm.tsx (Config-Driven and Optimized)

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { showSuccess, showError, showWarning } from '../utils/toastNotifications';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import FormSelect from '../components/FormSelect';
import { formatEmailBody } from './EmailFormatter';
import { validateForm } from '../utils/validateForm';

// Question configuration
interface QuestionConfig {
  type: 'input' | 'textarea' | 'select' | 'date';
  label: string;
  name: keyof AzureFormData;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  conditional?: { name: keyof AzureFormData; value: string };
}

const questionConfigs: QuestionConfig[] = [
  { type: 'input',    label: '1. Customer Name',                         name: 'customerName', required: true },
  { type: 'textarea', label: '2. Scope of the Project',                  name: 'projectScope', required: true, placeholder: "Project objectives, deliverables, boundaries." },
  { type: 'textarea', label: '3. Detailed Requirement',                  name: 'detailedRequirement', required: true, placeholder: 'Technical, functional, operational requirements.' },
  { type: 'select',   label: '4. Primary Goals for Moving to Azure',     name: 'primaryGoal', required: true, placeholder: '— Select a primary goal —', options: ['Cost Optimization','Regulatory Compliance','Modernize Legacy Systems','Disaster Recovery','Scalability & Performance','Cybersecurity','Other'] },
  { type: 'input',    label: 'Specify other primary goal',              name: 'otherPrimary', required: true, conditional: { name: 'primaryGoal', value: 'Other' } },
  { type: 'select',   label: '5. Compliance Standards to Meet',          name: 'complianceStandard', required: true, placeholder: '— Select a standard —', options: ['Kuwait Cybersecurity Law','ISO 27001','PCI DSS','GDPR','Other'] },
  { type: 'input',    label: 'Specify other compliance standard',        name: 'otherCompliance', required: true, conditional: { name: 'complianceStandard', value: 'Other' } },
  { type: 'textarea', label: '6. Business Point of Contact',             name: 'businessPOC', required: true, placeholder: 'Name, Role, Email, Phone' },
  { type: 'textarea', label: '7. Technical Point of Contact',            name: 'technicalPOC', required: true, placeholder: 'Name, Role, Email, Phone' },
  { type: 'date',     label: '8. Anticipated Project Start Date',        name: 'startDate', required: true },
  { type: 'date',     label: '8. Anticipated Project End Date',          name: 'endDate', required: true },
  { type: 'textarea', label: '9. Critical Project Milestones',           name: 'milestones', required: true, placeholder: 'List major phases or deadlines' }
];

export type AzureFormData = {
  customerName: string;
  projectScope: string;
  detailedRequirement: string;
  primaryGoal: string;
  otherPrimary: string;
  complianceStandard: string;
  otherCompliance: string;
  businessPOC: string;
  technicalPOC: string;
  startDate: string;
  endDate: string;
  milestones: string;
  budgetAllocation: string;
  budgetRange: string;
  rfpProcess: string;
  rfpDetails: string;
  workLocation: string;
  legacyIntegration: string;
  azureService: string;
  otherAzureService: string;
  submissionDate: string;
};

export default function AzureForm({
  user,
  functionUrl
}: {
  user: { name: string; username: string };
  functionUrl: string;
}) {
  const initialData: AzureFormData = {
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
  };

  const [formData, setFormData] = useState<AzureFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof AzureFormData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showWarning('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    showSuccess('Sending your responses…');
    try {
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.username,
          toEmail: import.meta.env.VITE_EMAIL_TO || '',
          subject: `Azure Landing Zone Discovery Survey from: ${user.username}`,
          message: formatEmailBody(formData)
        })
      });
      if (!res.ok) throw new Error(await res.text() || res.statusText);
      showSuccess('Email sent successfully!');
      setFormData(initialData);
    } catch (err: any) {
      console.error(err);
      showError(`Failed to send email: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Company Logo" className="h-16 drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 whitespace-nowrap">
          Azure Landing Zone Discovery Form
        </h2>

        {questionConfigs.map(q => {
          if (q.conditional && formData[q.conditional.name] !== q.conditional.value) return null;
          const common = {
            key: q.name,
            label: q.label,
            name: q.name,
            value: formData[q.name],
            onChange: handleChange,
            placeholder: q.placeholder,
            error: !!errors[q.name],
            required: q.required
          };
          switch (q.type) {
            case 'input':
              return <FormInput {...common} />;
            case 'textarea':
              return <FormTextarea {...common} />;
            case 'select':
              return <FormSelect {...common} options={q.options!} />;
            case 'date':
              return <FormInput {...common} type="date" />;
          }
        })}

<FormSelect
  label="10. Budget Allocation"
  name="budgetAllocation"
  value={formData.budgetAllocation}
  onChange={handleChange}
  options={['Yes', 'No', 'Not yet determined']}
  required
  error={!!errors.budgetAllocation}
/>

{/* Conditionally show the budget range input when "Yes" */}
{formData.budgetAllocation === 'Yes' && (
  <FormInput
    label="Specify budget range"
    name="budgetRange"
    value={formData.budgetRange}
    onChange={handleChange}
    placeholder="e.g. 10,000 – 50,000 USD"
    required
    error={!!errors.budgetRange}
  />
)}
{/* Question 11 – RFP Process Required? */}
<FormSelect
  label="11. RFP Process Required?"
  name="rfpProcess"
  value={formData.rfpProcess}
  onChange={handleChange}
  options={['Yes', 'No', 'Not sure']}
  required
  error={!!errors.rfpProcess}
/>

{/* Show details textarea only when RFP is required */}
{formData.rfpProcess === 'Yes' && (
  <FormTextarea
    label="Describe Timeline & Vendor Process"
    name="rfpDetails"
    value={formData.rfpDetails}
    onChange={handleChange}
    placeholder="Describe bidding & evaluation steps."
    required
    error={!!errors.rfpDetails}
  />
)}
{/* Question 12 – Onsite or Offsite Work Required? */}
<FormSelect
  label="12. Onsite or Offsite Work Required?"
  name="workLocation"
  value={formData.workLocation}
  onChange={handleChange}
  options={['Onsite (Kuwait)', 'Offsite (Remote)', 'Hybrid']}
  required
  error={!!errors.workLocation}
/>
{/* Question 13 – Legacy/On‑Prem Systems Requiring Integration */}
<FormTextarea
  label="13. Legacy/On‑Prem Systems Requiring Integration"
  name="legacyIntegration"
  value={formData.legacyIntegration}
  onChange={handleChange}
  placeholder="e.g. SCADA, ERP, core banking"
  required
  error={!!errors.legacyIntegration}
/>

{/* Question 14 – Azure Services Already in Use (if any) */}
<FormSelect
  label="14. Azure Services Already in Use (if any)"
  name="azureService"
  value={formData.azureService}
  onChange={handleChange}
  options={[
    'Azure Active Directory',
    'Azure Sentinel',
    'Azure Virtual Machines',
    'Azure Policy',
    'None',
    'Other'
  ]}
  placeholder="— Select a service —"
  required
  error={!!errors.azureService}
/>

{/* If user selects “Other”, show an input to specify */}
{formData.azureService === 'Other' && (
  <FormInput
    label="Please specify other Azure service"
    name="otherAzureService"
    value={formData.otherAzureService}
    onChange={handleChange}
    placeholder="e.g. Azure Cosmos DB"
    required
    error={!!errors.otherAzureService}
  />
)}
{/* Question 15 – Date of Submission */}
<FormInput
  label="15. Date of Submission"
  name="submissionDate"
  type="date"
  value={formData.submissionDate}
  onChange={handleChange}
  required
  error={!!errors.submissionDate}
/>






        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg mt-6`}
        >
          {submitting ? 'Sending…' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
