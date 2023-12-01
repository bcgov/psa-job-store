import { render } from '@testing-library/react';
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
    const { getByText } = render(<PageHeader title="Test Title" subTitle="Test Subtitle" />);

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('displays breadcrumbs based on route matches', () => {
    const { getByText } = render(<PageHeader title="Test Title" />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Jobs')).toBeInTheDocument();
  });
});
