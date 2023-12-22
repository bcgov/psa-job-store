import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { JobProfile } from './job-profile.component';

import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const mockProfileData = {
  id: '1',
  title: 'Software Developer',
  classification: { code: 'Level 2' },
  context: 'Development',
  overview: 'Software Development',
  accountabilities: {
    required: ['Coding', 'Testing'],
    optional: ['Documentation'],
  },
  requirements: ['JavaScript', 'React'],
  behavioural_competencies: [{ behavioural_competency: { name: 'Teamwork', description: 'Effective in teams' } }],
};

const mockProfileDataApiResponse = {
  jobProfile: mockProfileData,
};

jest.mock('../../../redux/services/graphql-api/job-profile.api', () => ({
  useLazyGetJobProfileQuery: jest
    .fn()
    .mockImplementation(() => [jest.fn(), { data: mockProfileDataApiResponse, isLoading: false }]),
}));

describe('JobProfile Component Tests', () => {
  const setup = (profileData = mockProfileData) => {
    render(
      <MemoryRouter>
        <JobProfile profileData={profileData} />
      </MemoryRouter>,
    );
  };

  it('renders without crashing', () => {
    setup();
    expect(screen.getByTestId('job-profile')).toBeInTheDocument();
  });

  it('displays the title correctly', () => {
    setup();
    const titleElements = screen.getAllByText('Software Developer');
    expect(titleElements.length).toBe(2);
    titleElements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('displays classification correctly', () => {
    setup();
    const classificationElements = screen.getAllByText('Level 2');
    expect(classificationElements.length).toBe(2);
    classificationElements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('displays context correctly', () => {
    setup();
    const contextElements = screen.getAllByText('Development');
    expect(contextElements.length).toBe(2);
    contextElements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('displays overview correctly', () => {
    setup();
    const overviewElements = screen.getAllByText('Software Development');
    expect(overviewElements.length).toBe(2);
    overviewElements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('displays required accountabilities correctly', () => {
    setup();
    mockProfileData.accountabilities.required.forEach((accountability) => {
      const accountabilityElements = screen.getAllByText(accountability);
      expect(accountabilityElements.length).toBe(2);
      accountabilityElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  it('displays optional accountabilities correctly', () => {
    setup();
    mockProfileData.accountabilities.optional.forEach((accountability) => {
      const accountabilityElements = screen.getAllByText(accountability);
      expect(accountabilityElements.length).toBe(2);
      accountabilityElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  it('displays requirements correctly', () => {
    setup();
    mockProfileData.requirements.forEach((requirement) => {
      const requirementElements = screen.getAllByText(requirement);
      expect(requirementElements.length).toBe(2);
      requirementElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  it('displays behavioural competencies correctly', () => {
    setup();
    mockProfileData.behavioural_competencies.forEach(({ behavioural_competency }) => {
      const nameElements = screen.getAllByText(behavioural_competency.name);
      expect(nameElements.length).toBe(2);
      nameElements.forEach((element) => expect(element).toBeInTheDocument());

      const descriptionElements = screen.getAllByText(behavioural_competency.description);
      expect(descriptionElements.length).toBe(2);
      descriptionElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  it('displays behavioural competencies correctly', () => {
    setup();
    mockProfileData.behavioural_competencies.forEach(({ behavioural_competency }) => {
      const nameElements = screen.getAllByText(behavioural_competency.name);
      expect(nameElements.length).toBe(2); // One for visual and one for screen-reader
      nameElements.forEach((element) => expect(element).toBeInTheDocument());

      const descriptionElements = screen.getAllByText(behavioural_competency.description);
      expect(descriptionElements.length).toBe(2); // One for visual and one for screen-reader
      descriptionElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });

  it('handles click on Use Profile button', () => {
    const mockOnUseProfile = jest.fn();
    render(
      <MemoryRouter>
        <JobProfile profileData={mockProfileData} onUseProfile={mockOnUseProfile} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('Use Profile'));
    expect(mockOnUseProfile).toHaveBeenCalled();
  });

  it('shows error message when no data is provided', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<JobProfile />)).toThrow('No ID');
  });

  it('renders back to results link when showBackToResults is true', () => {
    render(
      <MemoryRouter>
        <JobProfile profileData={mockProfileData} showBackToResults={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Back to Search Results')).toBeInTheDocument();
  });

  it('does not render back to results link when showBackToResults is false', () => {
    render(
      <MemoryRouter>
        <JobProfile profileData={mockProfileData} showBackToResults={false} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('Back to Search Results')).toBeNull();
  });

  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <JobProfile profileData={mockProfileData} />
      </MemoryRouter>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('fetches data when id is provided', async () => {
    render(
      <MemoryRouter>
        <JobProfile id="123" />
      </MemoryRouter>,
    );

    // Wait for the mock data to be displayed
    await waitFor(() => {
      const titleElements = screen.getAllByText('Software Developer');
      expect(titleElements.length).toBe(2);
      titleElements.forEach((element) => expect(element).toBeInTheDocument());
    });
  });
});
