/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
// import { debug } from 'jest-preview';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
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

let mockSearchParam = '';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: any) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
  useLocation: () => ({
    pathname: '/',
    search: mockSearchParam,
    hash: '',
    state: null,
  }),
  useMatches: () => [
    {
      id: '0',
      pathname: '/',
      params: {},
      data: null,
      handle: null,
    },
  ],
}));

describe('JobProfilesPage', () => {
  it('renders the page header and job profiles', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <JobProfilesPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Job profiles')).toBeInTheDocument();
    expect(getByText('Explore job profiles')).toBeInTheDocument();
    expect(getByText('Showing 1-7 of 7 results')).toBeInTheDocument();
  });
});
