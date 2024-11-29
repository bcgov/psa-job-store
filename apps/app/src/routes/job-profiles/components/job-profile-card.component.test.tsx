import { render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';
import { JobProfileCard } from './job-profile-card.component';

// Mock DOMPurify
jest.mock('dompurify', () => {
  return {
    default: {
      sanitize: jest.fn((content) => content),
    },
  };
});

// Mock the react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ number: '12345' }),
  useSearchParams: jest.fn(),
}));

// Mock the Redux hooks
jest.mock('../../../redux/services/graphql-api/saved-job-profile.api', () => ({
  useGetSavedJobProfileIdsQuery: () => ({
    data: { getSavedJobProfileIds: [1, 2, 3] },
  }),
  useSaveJobProfileMutation: () => [jest.fn()],
  useRemoveSavedJobProfileMutation: () => [jest.fn()],
}));

const mockJobProfile = {
  id: 1,
  number: 12345,
  title: 'Test Job Profile',
  context: '<p>Test Context</p>',
  overview: 'Test Overview',
  classifications: [
    {
      classification: {
        name: 'Test Classification',
      },
    },
  ],
  organizations: [
    {
      organization: {
        name: 'Test Organization',
      },
    },
  ],
  role_type: {
    name: 'Test Role Type',
  },
  all_organizations: false,
} as JobProfileModel;

describe('JobProfileCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useSearchParams implementation
    (useSearchParams as jest.Mock).mockImplementation(() => [new URLSearchParams(), jest.fn()]);
  });

  it('renders job profile information correctly', () => {
    render(
      <MemoryRouter>
        <JobProfileCard data={mockJobProfile} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Job Profile')).toBeInTheDocument();
    expect(screen.getByText('Test Classification')).toBeInTheDocument();
    expect(screen.getByText(/Test Organization/)).toBeInTheDocument();
    expect(screen.getByText(/Test Role Type/)).toBeInTheDocument();
    expect(screen.getByText(/Test Context/)).toBeInTheDocument();
    expect(screen.getByText(/Test Overview/)).toBeInTheDocument();
  });

  // it('handles save profile button click', async () => {
  //   const onSavedCallback = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={mockJobProfile} onSavedCallback={onSavedCallback} />
  //     </MemoryRouter>,
  //   );

  //   const saveButton = screen.getByLabelText('Save profile');
  //   fireEvent.click(saveButton);

  //   await waitFor(() => {
  //     expect(onSavedCallback).toHaveBeenCalledWith(true, mockJobProfile);
  //   });
  // });

  // it('handles remove saved profile button click', async () => {
  //   const onSavedCallback = jest.fn();
  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={mockJobProfile} onSavedCallback={onSavedCallback} />
  //     </MemoryRouter>,
  //   );

  //   const removeButton = screen.getByLabelText('Remove from saved profiles');
  //   fireEvent.click(removeButton);

  //   await waitFor(() => {
  //     expect(onSavedCallback).toHaveBeenCalledWith(false, mockJobProfile);
  //   });
  // });

  // it('copies link to clipboard when copy link button is clicked', async () => {
  //   const mockClipboard = {
  //     writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  //   };
  //   Object.assign(navigator, { clipboard: mockClipboard });

  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={mockJobProfile} />
  //     </MemoryRouter>,
  //   );

  //   const copyButton = screen.getByLabelText('Copy link to profile');
  //   fireEvent.click(copyButton);

  //   await waitFor(() => {
  //     expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('/job-profiles/12345'));
  //   });
  // });

  // it('displays multiple organizations correctly', () => {
  //   const multiOrgProfile = {
  //     ...mockJobProfile,
  //     organizations: [{ organization: { name: 'Org 1' } }, { organization: { name: 'Org 2' } }],
  //   } as JobProfileModel;

  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={multiOrgProfile} />
  //     </MemoryRouter>,
  //   );

  //   expect(screen.getByText('2 Ministries')).toBeInTheDocument();
  // });

  // it('displays "All ministries" when all_organizations is true', () => {
  //   const allOrgProfile = {
  //     ...mockJobProfile,
  //     all_organizations: true,
  //   };

  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={allOrgProfile} />
  //     </MemoryRouter>,
  //   );

  //   expect(screen.getByText('All ministries')).toBeInTheDocument();
  // });

  // it('applies selected styling when profile is selected', () => {
  //   render(
  //     <MemoryRouter>
  //       <JobProfileCard data={mockJobProfile} />
  //     </MemoryRouter>,
  //   );

  //   const card = screen.getByTestId('job-profile-card');
  //   expect(card).toHaveClass('testid-selectedProfile');
  // });
});
