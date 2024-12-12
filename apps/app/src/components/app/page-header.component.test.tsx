import { render } from '@testing-library/react';
// import { debug } from 'jest-preview';
import { MemoryRouter } from 'react-router-dom';
import { PageHeader } from './page-header.component';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useMatches: () => [
    { path: '/', handle: { breadcrumb: () => 'Home', icon: 'homeIcon' } },
    { path: '/jobs', handle: { breadcrumb: () => 'Jobs', icon: 'jobsIcon' } },
  ],
}));

describe('PageHeader', () => {
  it('renders the page header with correct properties', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/initial/path']}>
        <PageHeader title="Test Title" subTitle="Test Subtitle" />
      </MemoryRouter>,
    );

    // debug();
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('displays breadcrumbs based on route matches', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/initial/path']}>
        <PageHeader title="Test Title" subTitle="Test Subtitle" />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Jobs')).toBeInTheDocument();
  });
});
