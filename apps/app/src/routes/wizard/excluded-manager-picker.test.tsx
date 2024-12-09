import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Control } from 'react-hook-form';
import { Provider } from 'react-redux';
import { useGetSuggestedManagersQuery } from '../../redux/services/graphql-api/position-request.api';
import { useLazySearchUsersQuery } from '../../redux/services/graphql-api/user.api';
import { ExcludedManagerPicker } from './excluded-manager-picker';
import { WizardConfirmDetailsModel } from './wizard-confirm-details.page';
// import { debug } from 'jest-preview';

const mockStore = configureStore({
  reducer: {
    api: (state = {}) => state,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Mock the entire react-hook-form module
const onChange = jest.fn();
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }: any) =>
    render({
      field: {
        value: '',
        onChange: onChange,
        onBlur: jest.fn(),
        name: 'excludedManagerPositionNumberAndName',
        ref: jest.fn(),
      },
      fieldState: {
        invalid: false,
        error: undefined,
      },
    }),
}));

// Simplified mock control
const mockControl = {
  _formValues: {},
} as unknown as Control<WizardConfirmDetailsModel>;

const defaultProps = {
  control: mockControl,
  errors: {},
  positionNumber: '15',
  positionRequestId: 67890,
};

jest.mock('../../redux/services/graphql-api/user.api', () => ({
  useLazySearchUsersQuery: jest.fn(),
}));

describe('ExcludedManagerPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    // jest.restoreAllMocks();
  });

  it('renders the component with default state', () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [],
          numberOfResults: 0,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);

    const { getByRole } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('displays loading state when searching', async () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [],
          numberOfResults: 0,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);

    (useGetSuggestedManagersQuery as jest.MockedFunction<any>).mockReturnValueOnce({
      data: {},
      isLoading: true,
      isFetching: true,
      error: null,
    });

    const { getByRole, getByText } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    // First open the select dropdown
    const select = getByRole('combobox');
    fireEvent.mouseDown(select);

    // Then simulate search input
    await act(async () => {
      fireEvent.change(select, { target: { value: 'test' } });
    });

    // Wait for the loading state
    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('shows suggested managers when available', async () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [],
          numberOfResults: 0,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);
    const { getByRole, getByText } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    const select = getByRole('combobox');
    fireEvent.mouseDown(select);

    await waitFor(() => {
      expect(getByText('00812345 Sam Carter')).toBeInTheDocument();
      expect(getByText('00812345 Bob Doe')).toBeInTheDocument();
      expect(getByText('00543278 Grace Thompson')).toBeInTheDocument();
    });
  });

  it('handles search input correctly', async () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [{ position_number: '789', name: 'Bob Wilson' }],
          numberOfResults: 1,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);

    const { getByRole } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    const select = getByRole('combobox');
    fireEvent.mouseDown(select);
    fireEvent.change(select, { target: { value: 'Bob' } });

    await waitFor(() => {
      expect(searchUsersSpy).toHaveBeenCalledWith('Bob');
    });
  });

  it('displays no results message when search returns empty', async () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [],
          numberOfResults: 0,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);

    const { getByRole } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    const select = getByRole('combobox');
    fireEvent.mouseDown(select);
    fireEvent.change(select, { target: { value: 'test' } });

    await waitFor(() => {
      const noResultsElements = screen.getAllByText('No results found');
      expect(noResultsElements[0]).toBeInTheDocument();
    });
  });

  it('handles selection of a manager', async () => {
    const searchUsersSpy = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        searchUsers: {
          results: [
            {
              id: '1',
              positionNumber: '00812345',
              firstName: 'Bob',
              lastName: 'Doe',
            },
          ],
          numberOfResults: 1,
        },
      }),
    });

    (useLazySearchUsersQuery as jest.MockedFunction<any>).mockReturnValue([searchUsersSpy, { isLoading: false }]);

    const { getByRole, getByText } = render(
      <Provider store={mockStore}>
        <ExcludedManagerPicker {...defaultProps} />
      </Provider>,
    );

    const select = getByRole('combobox');
    fireEvent.mouseDown(select);

    const option = getByText('00812345 Bob Doe');
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith('00812345|Bob Doe');
  });

  // it('displays error state when form validation fails', () => {
  //   // Test implementation
  // });

  // it('clears search results when dropdown closes', async () => {
  //   // Test implementation
  // });

  // it('shows correct aria labels for accessibility', () => {
  //   // Test implementation
  // });

  // it('handles pre-selected manager correctly', () => {
  //   // Test implementation
  // });

  // it('debounces search requests appropriately', async () => {
  //   // Test implementation
  // });

  // it('displays correct number of total results', async () => {
  //   // Test implementation
  // });

  // it('shows "more results" message when results exceed 10', async () => {
  //   // Test implementation
  // });
});

// Mock setup helpers
