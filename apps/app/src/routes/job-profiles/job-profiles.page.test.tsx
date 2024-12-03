/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
// import { debug } from 'jest-preview';
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

// Mock the store
jest.mock('../../redux/redux.store', () => ({
  useAppDispatch: () => jest.fn(),
  store: configureStore({
    reducer: {
      api: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  }),
}));

jest.mock('react-oidc-context', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: {
      profile: {
        idir_username: 'Bob',
      },
    },
    isLoading: false,
  }),
}));

describe('JobProfilesPage', () => {
  it('renders the page header and job profiles', () => {
    const router = createMemoryRouter([{ path: '/', element: <JobProfilesPage /> }]);
    const { getByText } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    // debug();
    // screen.debug();

    expect(getByText('Job profiles')).toBeInTheDocument();
    expect(getByText('Explore job profiles')).toBeInTheDocument();
    expect(getByText('Showing 1-7 of 7 results')).toBeInTheDocument();
  });
});
