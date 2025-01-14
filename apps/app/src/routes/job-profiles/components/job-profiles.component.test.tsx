import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useParams } from 'react-router-dom';
import JobProfiles from './job-profiles.component';
import { JobProfilesProvider } from './job-profiles.context';
// import { debug } from 'jest-preview';
import { Grid } from 'antd';
import { useLazyGetJobProfilesQuery } from '../../../redux/services/graphql-api/job-profile.api';

const mockGraphqlApiReducer = jest.fn().mockImplementation(() => ({}));
const mockMiddleware = () => (next: any) => (action: any) => next(action);

const store = configureStore({
  reducer: {
    // Use a mock reducer
    mockReducer: mockGraphqlApiReducer,
    authReducer: (state = { user: { username: 'TEST' } }) => state,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockMiddleware),
});

jest.mock('../../../redux/redux.store', () => ({
  useAppDispatch: () => jest.fn(),
  store: configureStore({
    reducer: {
      api: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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

    const { getByTestId } = render(
      <Provider store={store}>
        <JobProfilesProvider>
          <MemoryRouter>
            <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
          </MemoryRouter>
        </JobProfilesProvider>
      </Provider>,
    );

    expect(getByTestId('job-profile-search')).toBeInTheDocument();
    expect(getByTestId('job-profile-search-results')).toBeInTheDocument();
  });

  it('calls the trigger function with updated search parameters when searchParams change', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    let triggerFn: any;

    function TestComponent() {
      const [trigger] = useLazyGetJobProfilesQuery();
      triggerFn = trigger;
      return null;
    }

    // const searchParams = new URLSearchParams();
    // searchParams.set('search', 'developer');

    await act(async () => {
      render(
        <Provider store={store}>
          <JobProfilesProvider>
            <MemoryRouter initialEntries={['/path?search=developer']}>
              <TestComponent />
              <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
            </MemoryRouter>
          </JobProfilesProvider>
        </Provider>,
      );
    });

    expect(triggerFn).toHaveBeenCalledWith(
      expect.objectContaining({
        search: 'developer',
      }),
    );
  });

  it('renders JobProfile component when an ID is present in params', async () => {
    (useParams as jest.Mock).mockReturnValue({ number: '194' });
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });

    let rendered: any;
    await act(async () => {
      rendered = render(
        <Provider store={store}>
          <JobProfilesProvider>
            <MemoryRouter>
              <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={null} showVersions={true} />
            </MemoryRouter>
          </JobProfilesProvider>
        </Provider>,
      );
    });

    await waitFor(() => {
      expect(rendered.getByTestId('job-profile')).toBeInTheDocument();
    });
  });

  it('renders empty state when no ID is present in params', async () => {
    (useParams as jest.Mock).mockReturnValue({});
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });

    let rendered: any;
    await act(async () => {
      rendered = render(
        <Provider store={store}>
          <JobProfilesProvider>
            <MemoryRouter>
              <JobProfiles key={'SearchProfiles'} page_size={10} showVersions={true} />
            </MemoryRouter>
          </JobProfilesProvider>
        </Provider>,
      );
    });

    await waitFor(() => {
      expect(rendered.getByText('Select a job profile')).toBeInTheDocument();
      expect(rendered.getByText('Choose a profile from the sidebar on the left.')).toBeInTheDocument();
    });
  });

  it('handles page change correctly', async () => {
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    (useParams as jest.Mock).mockReturnValue({});
    let triggerFn: any;

    function TestComponent() {
      const [trigger] = useLazyGetJobProfilesQuery();
      triggerFn = trigger;
      return null;
    }

    let rendered: any;
    await act(async () => {
      rendered = render(
        <Provider store={store}>
          <JobProfilesProvider>
            <MemoryRouter>
              <TestComponent />
              <JobProfiles key={'SearchProfiles'} page_size={2} showVersions={true} />
            </MemoryRouter>
          </JobProfilesProvider>
        </Provider>,
      );
    });

    // Assuming the Pagination component has a test ID 'pagination'
    const paginationComponent = rendered.getByTestId('pagination');
    const newPage = 2;
    const pageSize = 2; // The page size you set in your component

    // Trigger the page change
    await act(async () => {
      const pageButton = within(paginationComponent).getByText(newPage.toString());
      fireEvent.click(pageButton);
    });

    // Check if the mockTrigger was called with the correct arguments
    expect(triggerFn).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: (newPage - 1) * pageSize,
        take: pageSize,
      }),
    );
  });

  it('updates component state and UI based on API response', async () => {
    (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
    (useParams as jest.Mock).mockReturnValue({});

    let rendered: any;
    await act(async () => {
      rendered = render(
        <Provider store={store}>
          <JobProfilesProvider>
            <MemoryRouter>
              <JobProfiles key={'SearchProfiles'} page_size={2} showVersions={true} />
            </MemoryRouter>
          </JobProfilesProvider>
        </Provider>,
      );
    });

    await waitFor(() => {
      const fileClerkElements = rendered.queryAllByText('Data Scientist');
      expect(fileClerkElements.length).toBeGreaterThanOrEqual(1);
    });

    await waitFor(() => {
      const itSpecialistElements = rendered.queryAllByText('Dynamic Digital Marketing Specialist');
      expect(itSpecialistElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  // it('renders different layouts based on screen size xl', async () => {
  //   // Mock useParams to simulate the presence of an ID
  //   (useParams as jest.Mock).mockReturnValue({ id: '123' });

  //   // First, mock the useBreakpoint hook for xl screen
  //   (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });

  //   // Render the component under test for xl screen
  //   const { getByTestId: getByTestIdXL, unmount: unmountXL } = render(
  //     <Provider store={store}>
  //       <JobProfilesProvider>
  //         <MemoryRouter>
  //           <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
  //         </MemoryRouter>
  //       </JobProfilesProvider>
  //     </Provider>,
  //   );

  //   // Expectations for xl screen
  //   expect(getByTestIdXL('job-profile-search')).toBeInTheDocument();
  //   expect(getByTestIdXL('job-profile-search-results')).toBeInTheDocument();
  //   expect(getByTestIdXL('job-profile')).toBeInTheDocument(); // or any other elements specific to xl layout

  //   unmountXL();

  //   // Now, mock the useBreakpoint hook for non-xl screen
  //   (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: false });

  //   // Render the component under test for non-xl screen
  //   const { getByTestId: getByTestIdNonXL, queryByTestId: queryByTestIdNonXL } = render(
  //     <Provider store={store}>
  //       <JobProfilesProvider>
  //         <MemoryRouter>
  //           <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
  //         </MemoryRouter>
  //       </JobProfilesProvider>
  //     </Provider>,
  //   );

  //   // Expectations for non-xl screen
  //   expect(getByTestIdNonXL('job-profile-search')).toBeInTheDocument();
  //   expect(queryByTestIdNonXL('job-profile-search-results')).not.toBeInTheDocument();
  //   expect(getByTestIdNonXL('job-profile')).toBeInTheDocument(); // or any other elements that should not be present in non-xl layout
  // });

  // it('displays error state when data fetch fails', () => {
  //   expect('proper error handling').toBe('implemented');

  //   // (useParams as jest.Mock).mockReturnValue({ id: '123' });
  //   // (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
  //   // (useLazyGetJobProfilesQuery as jest.Mock).mockReturnValue([jest.fn(), { error: 'Error fetching data', data: null, isLoading: false }]);

  //   // const { getByText } = render(
  //   //   <MemoryRouter>
  //   //     <JobProfiles searchParams={new URLSearchParams()} />
  //   //   </MemoryRouter>,
  //   // );

  //   // expect(getByText('Error fetching data')).toBeInTheDocument();
  // });

  // it('displays loading state when data is fetching', () => {
  //   expect('loading state').toBe('implemented');

  //   // (useParams as jest.Mock).mockReturnValue({ id: '123' });
  //   // (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });
  //   // (useLazyGetJobProfilesQuery as jest.Mock).mockReturnValue([jest.fn(), { data: null, isLoading: true }]);

  //   // const { getByTestId } = render(
  //   //   <MemoryRouter>
  //   //     <JobProfiles searchParams={new URLSearchParams()} />
  //   //   </MemoryRouter>,
  //   // );

  //   // // Assuming there's a test ID for the loading component
  //   // expect(getByTestId('loading-indicator')).toBeInTheDocument();
  // });

  // it('renders different layouts based on screen size xl - no profile selected', async () => {
  //   // Mock useParams to simulate the presence of an ID
  //   (useParams as jest.Mock).mockReturnValue({});

  //   // First, mock the useBreakpoint hook for xl screen
  //   (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: true });

  //   // Render the component under test for xl screen
  //   const { getByTestId: getByTestIdXL, unmount: unmountXL } = render(
  //     <Provider store={store}>
  //       <JobProfilesProvider>
  //         <MemoryRouter>
  //           <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
  //         </MemoryRouter>
  //       </JobProfilesProvider>
  //     </Provider>,
  //   );

  //   // Expectations for xl screen
  //   expect(getByTestIdXL('job-profile-search')).toBeInTheDocument();
  //   expect(getByTestIdXL('job-profile-search-results')).toBeInTheDocument();
  //   expect(getByTestIdXL('job-profile-empty')).toBeInTheDocument(); // or any other elements specific to xl layout

  //   unmountXL();

  //   // Now, mock the useBreakpoint hook for non-xl screen
  //   (Grid.useBreakpoint as jest.Mock).mockReturnValue({ xl: false });

  //   // Render the component under test for non-xl screen
  //   const { getByTestId: getByTestIdNonXL, queryByTestId: queryByTestIdNonXL } = render(
  //     <Provider store={store}>
  //       <JobProfilesProvider>
  //         <MemoryRouter>
  //           <JobProfiles key={'SearchProfiles'} page_size={10} selectProfileNumber={'123'} showVersions={true} />
  //         </MemoryRouter>
  //       </JobProfilesProvider>
  //     </Provider>,
  //   );

  //   // Expectations for non-xl screen
  //   expect(getByTestIdNonXL('job-profile-search')).toBeInTheDocument();
  //   expect(getByTestIdNonXL('job-profile-search-results')).toBeInTheDocument();
  //   expect(queryByTestIdNonXL('job-profile-empty')).not.toBeInTheDocument(); // or any other elements that should not be present in non-xl layout
  // });
});
