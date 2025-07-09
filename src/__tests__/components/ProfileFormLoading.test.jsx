import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProfileFormLoading } from '../../components/ProfileFormLoading';

describe('ProfileFormLoading', () => {
  it('renderiza el skeleton del formulario', () => {
    const { container } = render(<ProfileFormLoading />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('animate-pulse');
  });
});
