// src/utils/validateForm.ts

export interface FormErrors {
  [key: string]: boolean;
}

export function validateForm(formData: Record<string, any>): FormErrors {
  const newErrors: FormErrors = {};

  // ✅ Required base fields
  const requiredFields = [
    'customerName',
    'projectScope',
    'detailedRequirement',
    'businessPOC',
    'technicalPOC',
    'startDate',
    'endDate',
    'milestones',
    'legacyIntegration',
    'submissionDate'
  ];

  for (const field of requiredFields) {
    const value = formData[field];
    if (typeof value === 'string' && value.trim() === '') {
      newErrors[field] = true;
    }
  }

  // ✅ Conditional “Other” logic
  if (formData.primaryGoal === 'Other' && !formData.otherPrimary?.trim()) {
    newErrors.otherPrimary = true;
  }

  if (formData.complianceStandard === 'Other' && !formData.otherCompliance?.trim()) {
    newErrors.otherCompliance = true;
  }

  if (formData.budgetAllocation === 'Yes' && !formData.budgetRange?.trim()) {
    newErrors.budgetRange = true;
  }

  if (formData.rfpProcess === 'Yes' && !formData.rfpDetails?.trim()) {
    newErrors.rfpDetails = true;
  }

  if (formData.azureService === 'Other' && !formData.otherAzureService?.trim()) {
    newErrors.otherAzureService = true;
  }

  return newErrors;
}
