import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { debug } from 'jest-preview';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { JobProfileSearch } from './job-profile-search.component';
import { JobProfilesProvider } from './job-profiles.context';
// import { debug } from 'jest-preview';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(), // mock useSearchParams
  };
});

describe('JobProfileSearch', () => {
  // it('renders the search input and dropdown filters', () => {
  //   let mockSearchParams = new URLSearchParams();
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   // Provide the mock implementation for useSearchParams
  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   const { getByPlaceholderText, getByTestId } = render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   expect(getByPlaceholderText('Search by job title or keyword')).toBeInTheDocument();

  //   expect(getByTestId('Classification-filter')).toBeInTheDocument();
  //   expect(getByTestId('Job Family-filter')).toBeInTheDocument();
  // });

  // it('handles search input correctly', async () => {
  //   let mockSearchParams = new URLSearchParams();
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   // Provide the mock implementation for useSearchParams
  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   const mockNavigate = jest.fn();
  //   jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

  //   const { getByPlaceholderText } = render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   const searchInput = getByPlaceholderText('Search by job title or keyword');
  //   fireEvent.change(searchInput, { target: { value: 'test search' } });
  //   // fireEvent.keyPress(searchInput, { key: 'Enter', code: 13 });
  //   userEvent.type(searchInput, '{enter}');

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       {
  //         pathname: expect.any(String),
  //         search: expect.stringContaining('search=test+search'),
  //       },
  //       {
  //         replace: true,
  //       },
  //     );
  //   });
  // });

  // it('handles classification filter selection correctly', async () => {
  //   let mockSearchParams = new URLSearchParams();
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   const mockNavigate = jest.fn();
  //   jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

  //   // Provide the mock implementation for useSearchParams
  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   const { getByTestId } = render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   // Find the dropdown for 'Classification'
  //   const classificationDropdown = getByTestId('Classification-filter');

  //   // Find the '.ant-select-selector' within the dropdown and click it
  //   const selectSelector = classificationDropdown.querySelector('.react-select__input-container');
  //   if (selectSelector) {
  //     fireEvent.mouseDown(selectSelector);
  //   } else {
  //     throw new Error('Dropdown selector not found');
  //   }

  //   // Wait for dropdown options to be visible
  //   const dropdownOption = await screen.findByText('Communications Officer R30');

  //   // Click on the first dropdown option
  //   fireEvent.click(dropdownOption);

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       {
  //         pathname: '',
  //         search: expect.stringContaining('classification_id__in=501537.GEU.BCSET&page=1'),
  //       },
  //       {
  //         replace: true,
  //       },
  //     );
  //   });
  // });

  // it('handles multiple filter selections correctly', async () => {
  //   // Mock URLSearchParams
  //   let mockSearchParams = new URLSearchParams();
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   const mockNavigate = jest.fn();
  //   jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

  //   // Provide the mock implementation for useSearchParams
  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   // Select a job family
  //   const jobFamilyDropdown = screen.getByTestId('Job role type-filter');
  //   let clickEl = jobFamilyDropdown.querySelector('.react-select__input-container');
  //   if (clickEl == null) throw Error('selector not found');
  //   else fireEvent.mouseDown(clickEl);

  //   const jobFamilyOption = await screen.findByText('People Leader');
  //   fireEvent.click(jobFamilyOption);

  //   const classificationDropdown = screen.getByTestId('Classification-filter');
  //   clickEl = classificationDropdown.querySelector('.react-select__input-container');
  //   if (clickEl == null) throw Error('selector not found');
  //   else fireEvent.mouseDown(clickEl);

  //   const classificationOption = await screen.findByText('Communications Officer R30');
  //   fireEvent.click(classificationOption);

  //   await waitFor(() => {
  //     // Check if navigate was called with the correct search params

  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       {
  //         pathname: '',
  //         search: expect.stringContaining('classification_id__in=501537.GEU.BCSET&page=1'),
  //       },
  //       {
  //         replace: true,
  //       },
  //     );

  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       {
  //         pathname: '',
  //         search: expect.stringContaining('job_role_type_id__in=2&classification_id__in=501537.GEU.BCSET&page=1'),
  //       },
  //       {
  //         replace: true,
  //       },
  //     );
  //   });
  // });

  // it('clears filters and updates URL parameters correctly', async () => {
  //   let mockSearchParams = new URLSearchParams('job_role_type_id__in=2&classification_id__in=501537.GEU.BCSET&page=1');
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   const mockNavigate = jest.fn();
  //   jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   const clearButton = screen.getByText('Clear all filters');
  //   fireEvent.click(clearButton);

  //   await waitFor(() => {
  //     // Check if navigate was called with the correct search params
  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       {
  //         pathname: expect.any(String),
  //         search: expect.stringContaining(''),
  //       },
  //       {
  //         replace: true,
  //       },
  //     );
  //   });
  // });

  it('renders tags for selected filters and allows removing them', async () => {
    let mockSearchParams = new URLSearchParams('job_role_type_id__in=2&classification_id__in=501537.GEU.BCSET&page=1');
    const mockSetSearchParams = jest.fn((newParams) => {
      mockSearchParams = new URLSearchParams(newParams);
    });

    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

    jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

    const { container } = render(
      <JobProfilesProvider>
        <MemoryRouter>
          <JobProfileSearch />
        </MemoryRouter>
      </JobProfilesProvider>,
    );

    // Find the classification tag with specific text and class
    const classificationTag = await waitFor(() => {
      const tags = container.querySelectorAll('.ant-tag');
      return Array.from(tags).find((tag) => tag.textContent === 'Communications Officer R30');
    });

    debug();

    if (!classificationTag) throw new Error('Classification tag not found');
    expect(classificationTag).toBeInTheDocument();

    // Ensure that the classificationTag is an HTMLElement before using it with within
    if (!(classificationTag instanceof HTMLElement)) {
      throw new Error('Found element is not an HTMLElement');
    }

    // Close the classification tag
    const closeIcon = within(classificationTag).getByLabelText('close');
    fireEvent.click(closeIcon);

    // await waitFor(() => {
    //   expect(mockSetSearchParams).toHaveBeenCalled();
    //   expect(mockSearchParams.toString()).not.toContain('classification_id__in=3');
    // });

    await waitFor(() => {
      // Check if navigate was called with the correct search params
      expect(mockNavigate).toHaveBeenCalledWith(
        {
          pathname: expect.any(String),
          search: expect.stringContaining('classification_id__in=501537.GEU.BCSET&page=1'),
        },
        {
          replace: true,
        },
      );
    });
  });

  // it('preserves search query after filters are cleared', () => {
  //   expect('').toBe('implemented');
  // });

  // it('resets page after filters are cleared', () => {
  //   expect('').toBe('implemented');
  // });

  // it('resets page after search is cleared', () => {
  //   expect('').toBe('implemented');
  // });

  // it('resets page after filters are applied', () => {
  //   expect('').toBe('implemented');
  // });

  // it('resets page after search is applied', () => {
  //   expect('').toBe('implemented');
  // });

  // it('handles job family filter selection correctly', async () => {
  //   const mockNavigate = jest.fn();
  //   jest.mocked(useNavigate).mockImplementation(() => mockNavigate);

  //   let mockSearchParams = new URLSearchParams();
  //   const mockSetSearchParams = jest.fn((newParams) => {
  //     mockSearchParams = new URLSearchParams(newParams);
  //   });

  //   // Provide the mock implementation for useSearchParams
  //   jest.mocked(useSearchParams).mockImplementation(() => [mockSearchParams, mockSetSearchParams]);

  //   const { getByTestId } = render(
  //     <JobProfilesProvider>
  //       <MemoryRouter>
  //         <JobProfileSearch />
  //       </MemoryRouter>
  //     </JobProfilesProvider>,
  //   );

  //   // Find the dropdown for 'Job Family'
  //   const jobFamilytionDropdown = getByTestId('Job Family-filter');

  //   // Find the '.ant-select-selector' within the dropdown and click it
  //   const selectSelector = jobFamilytionDropdown.querySelector('.react-select__input-container');
  //   if (selectSelector) {
  //     fireEvent.mouseDown(selectSelector);
  //   } else {
  //     throw new Error('Dropdown selector not found');
  //   }

  //   // Wait for dropdown options to be visible
  //   const dropdownOption = await screen.findByText('Engineering');

  //   // Click on the first dropdown option
  //   fireEvent.click(dropdownOption);

  //   await waitFor(() => {
  //     // Check if navigate was called with the correct parameters
  //     expect(mockNavigate).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         pathname: expect.any(String),
  //         search: expect.stringContaining('job_family_id__in=2'),
  //       }),
  //     );
  //   });
  // });
});
