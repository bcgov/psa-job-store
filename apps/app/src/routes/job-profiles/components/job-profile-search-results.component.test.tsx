import { act, fireEvent, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GetJobProfilesResponse } from '../../../redux/services/graphql-api/job-profile-types';
import { JobProfileSearchResults } from './job-profile-search-results.component';

const mockData = {
  jobProfiles: [
    {
      id: 4,
      stream: 'CORPORATE',
      title: 'IT Specialist',
      number: 189,
      context: 'Context 1',
      overview: 'Overview 1',
      accountabilities: {
        optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
        required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
      },
      requirements: ['R 1', 'R 2', 'R 3'],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
        {
          behavioural_competency: {
            id: 35,
            name: 'Service orientation',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
        },
        {
          behavioural_competency: {
            id: 36,
            name: 'Teamwork and cooperation',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
        },
      ],
      classification: {
        id: '551052',
        code: 'A 1',
      },
      family: {
        id: 3,
        name: 'Budgeting',
      },
      role: null,
      career_group: {
        id: 1,
        name: 'Administrative Services',
      },
      organization: null,
      reports_to: [
        {
          classification: {
            id: '185001',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            code: 'Band 6',
          },
        },
      ],
    },
    {
      id: 5,
      stream: 'CORPORATE',
      title: 'File Clerk',
      number: 189,
      context: 'Context 1',
      overview: 'Overview 1',
      accountabilities: {
        optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
        required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
      },
      requirements: ['R 1', 'R 2', 'R 3'],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
        {
          behavioural_competency: {
            id: 35,
            name: 'Service orientation',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
        },
        {
          behavioural_competency: {
            id: 36,
            name: 'Teamwork and cooperation',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
        },
      ],
      classification: {
        id: '551052',
        code: 'A 1',
      },
      family: {
        id: 3,
        name: 'Budgeting',
      },
      role: null,
      career_group: {
        id: 1,
        name: 'Administrative Services',
      },
      organization: null,
      reports_to: [
        {
          classification: {
            id: '185001',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            code: 'Band 6',
          },
        },
      ],
    },
    {
      id: 6,
      stream: 'CORPORATE',
      title: 'File Clerk',
      number: 189,
      context: 'Context 1',
      overview: 'Overview 1',
      accountabilities: {
        optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
        required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
      },
      requirements: ['R 1', 'R 2', 'R 3'],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
        {
          behavioural_competency: {
            id: 35,
            name: 'Service orientation',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
        },
        {
          behavioural_competency: {
            id: 36,
            name: 'Teamwork and cooperation',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
        },
      ],
      classification: {
        id: '551052',
        code: 'A 1',
      },
      family: {
        id: 3,
        name: 'Budgeting',
      },
      role: null,
      career_group: {
        id: 1,
        name: 'Administrative Services',
      },
      organization: null,
      reports_to: [
        {
          classification: {
            id: '185001',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            code: 'Band 6',
          },
        },
      ],
    },
  ],
  jobProfilesCount: 2,
};

describe('JobProfileSearchResults', () => {
  // it('renders job profile data correctly', () => {

  //   render(
  //     <MemoryRouter>
  //       <JobProfileSearchResults
  //         data={mockData as unknown as GetJobProfilesResponse}
  //         isLoading={false}
  //         currentPage={1}
  //         pageSize={2}
  //         totalResults={2}
  //         onPageChange={() => {}}
  //       />
  //     </MemoryRouter>,
  //   );

  //   expect(screen.getByText('IT Specialist')).toBeInTheDocument();
  //   expect(screen.getByText('File Clerk')).toBeInTheDocument();
  // });

  // it('calls onSelectProfile when a job profile is clicked', () => {
  //   const onSelectProfileMock = jest.fn();

  //   render(
  //     <MemoryRouter>
  //       <JobProfileSearchResults
  //         data={mockData as unknown as GetJobProfilesResponse}
  //         isLoading={false}
  //         onSelectProfile={onSelectProfileMock}
  //         currentPage={1}
  //         pageSize={1}
  //         totalResults={1}
  //         onPageChange={() => {}}
  //       />
  //     </MemoryRouter>,
  //   );

  //   fireEvent.click(screen.getByText('IT Specialist'));
  //   expect(onSelectProfileMock).toHaveBeenCalledWith('4');
  // });

  it('calls onPageChange when a page gets changed', async () => {
    const onSelectProfileMock = jest.fn();
    const onPageChange = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <JobProfileSearchResults
          data={mockData as unknown as GetJobProfilesResponse}
          isLoading={false}
          onSelectProfile={onSelectProfileMock}
          currentPage={1}
          pageSize={2}
          totalResults={3}
          onPageChange={onPageChange}
        />
      </MemoryRouter>,
    );

    // console.log(container.outerHTML);

    const paginationComponent = getByTestId('pagination');
    await act(async () => {
      const pageButton = within(paginationComponent).getByText('2');
      fireEvent.click(pageButton);
    });

    expect(onPageChange).toHaveBeenCalledWith(2, 2);
  });
});
