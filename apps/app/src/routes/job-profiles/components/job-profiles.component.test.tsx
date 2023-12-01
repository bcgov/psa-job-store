import { act, fireEvent, render, within } from '@testing-library/react';
import { Grid } from 'antd';
import { MemoryRouter, useParams } from 'react-router-dom';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';
import JobProfiles from './job-profiles.component';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
  useParams: jest.fn(),
}));

// Mocking the useBreakpoint hook
jest.mock('antd/lib/grid', () => {
  const originalModule = jest.requireActual('antd/lib/grid');

  return {
    ...originalModule,
    useBreakpoint: jest.fn(),
  };
});

describe('JobProfiles', () => {
  it('renders JobProfileSearch and JobProfileSearchResults components', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    const { getByTestId, debug } = render(
      <MemoryRouter>
        <JobProfiles searchParams={new URLSearchParams()} />
      </MemoryRouter>,
    );
    debug();
    expect(getByTestId('job-profile-search')).toBeInTheDocument();
    expect(getByTestId('job-profile-search-results')).toBeInTheDocument();
  });

  it('calls the trigger function with updated search parameters when searchParams change', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    const [trigger] = useLazyGetJobProfilesQuery();
    const searchParams = new URLSearchParams();
    searchParams.set('search', 'developer');

    await act(async () => {
      render(
        <MemoryRouter>
          <JobProfiles searchParams={searchParams} />
        </MemoryRouter>,
      );
    });

    expect(trigger).toHaveBeenCalledWith(
      expect.objectContaining({
        search: 'developer',
      }),
    );
  });

  it('renders JobProfile component when an ID is present in params', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfiles searchParams={new URLSearchParams()} />
      </MemoryRouter>,
    );
    expect(getByTestId('job-profile')).toBeInTheDocument();
  });

  it('renders empty state when no ID is present in params', () => {
    (useParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(
      <MemoryRouter>
        <JobProfiles searchParams={new URLSearchParams()} />
      </MemoryRouter>,
    );
    expect(getByText('Select a Job Profile')).toBeInTheDocument();
    expect(getByText('Nothing is selected')).toBeInTheDocument();
  });

  it('handles page change correctly', async () => {
    const [trigger] = useLazyGetJobProfilesQuery();
    // (useLazyGetJobProfilesQuery as jest.Mock).mockReturnValue([mockTrigger, { data: {}, isLoading: false }]);
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    (useParams as jest.Mock).mockReturnValue({});

    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfiles searchParams={new URLSearchParams()} />
      </MemoryRouter>,
    );

    // Assuming the Pagination component has a test ID 'pagination'
    const paginationComponent = getByTestId('pagination');
    const newPage = 2;
    const pageSize = 2; // The page size you set in your component

    // Trigger the page change
    await act(async () => {
      const pageButton = within(paginationComponent).getByText(newPage.toString());
      fireEvent.click(pageButton);
    });

    // Check if the mockTrigger was called with the correct arguments
    expect(trigger).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: (newPage - 1) * pageSize,
        take: pageSize,
      }),
    );
  });

  it('updates component state and UI based on API response', async () => {
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    (useParams as jest.Mock).mockReturnValue({});
    const { queryAllByText } = render(
      <MemoryRouter>
        <JobProfiles searchParams={new URLSearchParams()} />
      </MemoryRouter>,
    );

    // Assert that the component renders data received from the API
    const fileClerkElements = queryAllByText('File Clerk');

    // Assert that the expected number of elements are found
    expect(fileClerkElements.length).toBeGreaterThanOrEqual(1);

    // Assert that the component renders data received from the API
    const itSpecialistElements = queryAllByText('IT Specialist');

    // Assert that the expected number of elements are found
    expect(itSpecialistElements.length).toBeGreaterThanOrEqual(1);
  });
});
