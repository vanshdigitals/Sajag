export interface StepContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  checklist: { id: string; label: string }[];
  officialLink?: { label: string; url: string };
  illustration?: string;
}

export const guideSteps: StepContent[] = [
  {
    id: 'eligibility',
    title: 'Check Your Eligibility',
    subtitle: 'Are you qualified to vote in India?',
    description: 'Before you can register, you must meet the basic criteria set by the Election Commission of India. Voting is a fundamental right for all qualified citizens.',
    checklist: [
      { id: 'age', label: 'I am 18 years of age or older' },
      { id: 'citizenship', label: 'I am a citizen of India' },
      { id: 'residence', label: 'I am an ordinary resident of the polling area' },
      { id: 'not_disqualified', label: 'I am not disqualified from voting due to criminal record or unsound mind' }
    ],
    officialLink: { label: 'ECI Eligibility Criteria', url: 'https://eci.gov.in' }
  },
  {
    id: 'registration',
    title: 'Register as a Voter',
    subtitle: 'Get your Voter ID (EPIC) card',
    description: 'To vote in India, you must be registered as a voter. This process gives you a Voter ID card, also known as EPIC (Electoral Photo Identity Card).',
    checklist: [
      { id: 'form6', label: 'Visit nvsp.in and fill Form 6' },
      { id: 'id_proof', label: 'Upload identity proof (Aadhaar/Passport)' },
      { id: 'address_proof', label: 'Upload address proof (Utility bill/Bank statement)' },
      { id: 'track', label: 'Submit and track application status' }
    ],
    officialLink: { label: 'Register on NVSP Portal', url: 'https://www.nvsp.in' }
  },
  {
    id: 'booth',
    title: 'Find Your Polling Booth',
    subtitle: 'Know where to go on election day',
    description: 'Your polling booth is assigned based on your residence. You can find it using your EPIC number or by searching with your details.',
    checklist: [
      { id: 'search', label: 'Search using EPIC number or name' },
      { id: 'locate', label: 'Locate booth on map' },
      { id: 'accessibility', label: 'Check for wheelchair accessibility/parking' }
    ],
    officialLink: { label: 'Electoral Search', url: 'https://electoralsearch.in' }
  },
  {
    id: 'voting',
    title: 'Understand Voting Day',
    subtitle: 'What to expect and how to vote',
    description: 'On election day, you will use an EVM (Electronic Voting Machine). After you vote, a VVPAT machine will show you a slip confirming your choice.',
    checklist: [
      { id: 'id_carry', label: 'Carry Voter ID or approved ID proof' },
      { id: 'ink', label: 'Get indelible ink on index finger' },
      { id: 'evm', label: 'Press button on EVM next to candidate name' },
      { id: 'vvpat', label: 'Verify your vote on the VVPAT window' }
    ]
  },
  {
    id: 'after',
    title: 'After You Vote',
    subtitle: 'Results and future duties',
    description: 'Your vote is counted during the counting phase. You can track results live on the ECI website or through official news channels.',
    checklist: [
      { id: 'results', label: 'Check result dates for your constituency' },
      { id: 'grievance', label: 'Know how to report election malpractices' },
      { id: 'keep_id', label: 'Keep your Voter ID card safe for future elections' }
    ]
  }
];
