import { getALStatus } from '../utils/pr-state';

describe('getALStatus', () => {
  // Define test cases for each defined scenario
  const testCases = [
    {
      description: "should return 'VERIFICATION' for 'New Position', 'Proposed', and 'Unresolved'",
      context: {
        category: 'New Position',
        crm_status: 'Unresolved',
        ps_status: 'Proposed',
        ps_effective_status: 'Active',
      },
      expected: 'VERIFICATION',
    },
    {
      description: "should return 'ACTION_REQUIRED' for 'Classification', 'Waiting - Client', and 'Proposed'",
      context: {
        category: 'Classification',
        crm_status: 'Waiting - Client',
        ps_status: 'Proposed',
        al_status: 'DRAFT',
        ps_effective_status: 'Active',
      },
      expected: 'ACTION_REQUIRED',
    },
    {
      description: "should return 'REVIEW' for 'Classification', 'Updated', and 'Proposed'",
      context: {
        category: 'Classification',
        crm_status: 'Updated',
        ps_status: 'Proposed',
        ps_effective_status: 'Active',
      },
      expected: 'REVIEW',
    },
    {
      description: "should return 'COMPLETED' for 'Classification', 'Solved', and 'Approved'",
      context: {
        category: 'Classification',
        crm_status: 'Solved',
        ps_status: 'Approved',
        ps_effective_status: 'Active',
      },
      expected: 'COMPLETED',
    },
    {
      description: "should return 'CANCELLED' for 'Inactive'",
      context: {
        category: 'New Position',
        crm_status: 'Solved',
        ps_status: 'Proposed',
        ps_effective_status: 'Inactive',
      },
      expected: 'CANCELLED',
    },
    {
      description: "should return 'UNKNOWN' for unsupported status combinations",
      context: {
        category: 'New Position',
        crm_status: 'Solved',
        ps_status: 'Proposed',
        ps_effective_status: 'Active',
      },
      expected: 'UNKNOWN',
    },
  ];

  // Execute each test case
  testCases.forEach(({ description, context, expected }) => {
    it(description, () => {
      const result = getALStatus(context);
      expect(result).toEqual(expected);
    });
  });
});
