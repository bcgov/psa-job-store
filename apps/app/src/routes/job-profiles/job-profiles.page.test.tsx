/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { JobProfilesPage } from './job-profiles.page';

// Mock the graphqlApi reducer and middleware
const mockGraphqlApiReducer = jest.fn().mockImplementation(() => ({}));
const mockMiddleware = () => (next: any) => (action: any) => next(action);

const store = configureStore({
  reducer: {
    // Use a mock reducer
    mockReducer: mockGraphqlApiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockMiddleware),
});

describe('JobProfilesPage', () => {
  it('renders the page header and job profiles', () => {
    const router = createMemoryRouter([{ path: '/', element: <JobProfilesPage /> }]);
    const { getByText } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(getByText('Job Profiles')).toBeInTheDocument();
    expect(getByText('Find a Job Profile which suits your needs')).toBeInTheDocument();
    expect(getByText('Showing 1-2 of 7 results')).toBeInTheDocument();
  });
});
