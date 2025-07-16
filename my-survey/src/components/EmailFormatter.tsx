import type { AzureFormData } from './AzureForm';
export function formatEmailBody(formValues: AzureFormData): string {

  const titleLine = 'Azure Landing Zone Discovery Form Details';
  const questionMap: [keyof AzureFormData, string][] = [
    ['customerName',       '1. Customer Name'],
    ['projectScope',       '2. Project Scope'],
    ['detailedRequirement','3. Detailed Requirement'],
    ['primaryGoal',        '4. Primary Goal'],
    ['otherPrimary',       '5. Other Primary'],
    ['complianceStandard', '6. Compliance Standard'],
    ['otherCompliance',    '7. Other Compliance'],
    ['businessPOC',        '8. Business POC'],
    ['technicalPOC',       '9. Technical POC'],
    ['startDate',          '10. Start Date'],
    ['endDate',            '11. End Date'],
    ['milestones',         '12. Milestones'],
    ['budgetAllocation',   '13. Budget Allocation'],
    ['budgetRange',        '14. Budget Range'],
    ['rfpProcess',         '15. RFP Process'],
    ['rfpDetails',         '16. RFP Details'],
    ['workLocation',       '17. Work Location'],
    ['legacyIntegration',  '18. Legacy Integration'],
    ['azureService',       '19. Azure Service'],
    ['otherAzureService',  '20. Other Azure Service'],
    ['submissionDate',     '21. Submission Date']
  ];
  const lines = questionMap.map(([key, label]) => {
    const value = formValues[key] ?? 'N/A';
    return `${label}: ${value}`;
  });
  return [
    titleLine,
    '',
    '==================================================',
    '',
    ...lines,
    '',
    '==================================================',
    '',
    'Best regards,',
    'Azure Landing Zone Discovery '
  ].join('\n');
}
