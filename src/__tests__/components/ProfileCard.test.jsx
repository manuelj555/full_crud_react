import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileCard } from '../../components/ProfileCard';
import { confirm } from '../../components/GlobalConfirm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock react-router Link
vi.mock('react-router', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
}));
// Mock confirm para no mostrar el modal real
vi.mock('../../components/GlobalConfirm', () => ({
  confirm: vi.fn()
}));

function renderWithQueryClient(ui) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('ProfileCard', () => {
  const baseProfile = {
    id: 1,
    username: 'Juan',
    photo: '',
    deleting: false,
  };

  it('muestra el nombre del usuario', () => {
    renderWithQueryClient(<ProfileCard profile={baseProfile} />);
    expect(screen.getByText('Juan')).toBeInTheDocument();
  });

  it('muestra la inicial si no hay foto', () => {
    renderWithQueryClient(<ProfileCard profile={baseProfile} />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('muestra la foto si existe', () => {
    renderWithQueryClient(<ProfileCard profile={{ ...baseProfile, photo: 'https://img.com/foto.jpg' }} />);
    expect(screen.getByAltText('Juan')).toHaveAttribute('src', 'https://img.com/foto.jpg');
  });

  it('el botón Editar tiene el link correcto', () => {
    renderWithQueryClient(<ProfileCard profile={baseProfile} />);
    const editLink = screen.getByText('Editar');
    expect(editLink).toHaveAttribute('href', '/editar/1');
  });

  it('al hacer click en Eliminar llama a confirm', () => {
    renderWithQueryClient(<ProfileCard profile={baseProfile} />);
    const deleteBtn = screen.getByText('Eliminar');
    fireEvent.click(deleteBtn);
    expect(confirm).toHaveBeenCalled();
  });
});
