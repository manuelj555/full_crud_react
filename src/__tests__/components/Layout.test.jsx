import { render, screen } from '@testing-library/react';
import { Layout } from '../../components/Layout';

// Mock Outlet para que no falle el render
vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet" />
}));

describe('Layout', () => {
  it('renderiza el header y el footer', () => {
    render(<Layout />);
    expect(screen.getByText('My Application')).toBeInTheDocument();
    expect(screen.getByText('© 2023 My Application')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
