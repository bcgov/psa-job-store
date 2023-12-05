import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { JobProfileSearch } from './job-profile-search.component';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe('JobProfileSearch', () => {
  it('handles search input correctly', async () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    const searchInput = getByPlaceholderText('Search by job title or keyword');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    // fireEvent.keyPress(searchInput, { key: 'Enter', code: 13 });
    userEvent.type(searchInput, '{enter}');

    await waitFor(() => {
      // Check if navigate was called with the correct search params
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: expect.any(String),
          search: expect.stringContaining('search=test+search'),
        }),
      );
    });
  });

  it('renders the search input and dropdown filters', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    expect(getByPlaceholderText('Search by job title or keyword')).toBeInTheDocument();
    expect(getByTestId('label-Organization')).toBeInTheDocument();
    expect(getByTestId('label-Classification')).toBeInTheDocument();
    expect(getByTestId('label-Job Family')).toBeInTheDocument();
  });

  it('handles organization filter selection correctly', async () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    // Find the dropdown for 'Organization'
    const organizationDropdown = getByTestId('Organization-filter');

    // Find the '.ant-select-selector' within the dropdown and click it
    const selectSelector = organizationDropdown.querySelector('.ant-select-selector');
    if (selectSelector) {
      fireEvent.mouseDown(selectSelector);
    } else {
      throw new Error('Dropdown selector not found');
    }

    // Wait for dropdown options to be visible
    const dropdownOption = await screen.findByText('Organization B');

    // Click on the first dropdown option
    fireEvent.click(dropdownOption);

    await waitFor(() => {
      // Check if navigate was called with the correct parameters
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: expect.any(String),
          search: expect.stringContaining('organization_id__in=1'),
        }),
      );
    });
  });

  it('handles classification filter selection correctly', async () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    // Find the dropdown for 'Classification'
    const classificationDropdown = getByTestId('Classification-filter');

    // Find the '.ant-select-selector' within the dropdown and click it
    const selectSelector = classificationDropdown.querySelector('.ant-select-selector');
    if (selectSelector) {
      fireEvent.mouseDown(selectSelector);
    } else {
      throw new Error('Dropdown selector not found');
    }

    // Wait for dropdown options to be visible
    const dropdownOption = await screen.findByText('C 3');

    // Click on the first dropdown option
    fireEvent.click(dropdownOption);

    await waitFor(() => {
      // Check if navigate was called with the correct parameters
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: expect.any(String),
          search: expect.stringContaining('classification_id__in=3'),
        }),
      );
    });
  });

  it('handles job family filter selection correctly', async () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    // Find the dropdown for 'Job Family'
    const jobFamilytionDropdown = getByTestId('Job Family-filter');

    // Find the '.ant-select-selector' within the dropdown and click it
    const selectSelector = jobFamilytionDropdown.querySelector('.ant-select-selector');
    if (selectSelector) {
      fireEvent.mouseDown(selectSelector);
    } else {
      throw new Error('Dropdown selector not found');
    }

    // Wait for dropdown options to be visible
    const dropdownOption = await screen.findByText('Engineering');

    // Click on the first dropdown option
    fireEvent.click(dropdownOption);

    await waitFor(() => {
      // Check if navigate was called with the correct parameters
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: expect.any(String),
          search: expect.stringContaining('job_family_id__in=2'),
        }),
      );
    });
  });

  it('handles multiple filter selections correctly', async () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <JobProfileSearch />
      </MemoryRouter>,
    );

    // Select an organization
    const orgDropdown = screen.getByTestId('Organization-filter');
    let clickEl = orgDropdown.querySelector('.ant-select-selector');
    if (clickEl == null) throw Error('selector not found');
    else fireEvent.mouseDown(clickEl);

    const orgOption = await screen.findByText('Organization B');
    fireEvent.click(orgOption);

    // Select a job family
    const jobFamilyDropdown = screen.getByTestId('Job Family-filter');
    clickEl = jobFamilyDropdown.querySelector('.ant-select-selector');
    if (clickEl == null) throw Error('selector not found');
    else fireEvent.mouseDown(clickEl);

    const jobFamilyOption = await screen.findByText('Engineering');
    fireEvent.click(jobFamilyOption);

    await waitFor(() => {
      // Check if navigate was called with both filters
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.objectContaining({
          search: expect.stringContaining('organization_id__in=1&job_family_id__in=2'),
        }),
      );
    });
  });

  it('clears organization filter correctly', async () => {
    expect('filter clearing').toBe('implemented');
  });
});
