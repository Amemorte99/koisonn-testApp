// __tests__/App.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { getComments, getTasks, getUser } from '../src/api/api';

// Mocks
jest.mock('../src/api/api', () => ({
  getComments: jest.fn(),
  getTasks: jest.fn(),
  getUser: jest.fn(),
  createComment: jest.fn(),
  deleteComment: jest.fn(),
}));

// Mock localStorage
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDAwMDAwMDB9.mock';
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => mockToken),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

describe('PM Tool - Tests Unitaires', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Affiche la page de login si non connecté', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  test('2. Sidebar s\'affiche avec tous les liens', async () => {
    render(<App />, { wrapper: MemoryRouter });
    await waitFor(() => expect(screen.getByText(/dashboard/i)).toBeInTheDocument());

    const links = ['Dashboard', 'Projects', 'Tasks', 'Tenants', 'Users', 'Comments'];
    links.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('3. Logout supprime le token et redirige', async () => {
    const user = userEvent.setup();
    render(<App />, {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/dashboard']}>{children}</MemoryRouter>
    });

    await waitFor(() => expect(screen.getByText(/dashboard/i)).toBeInTheDocument());

    const logoutBtn = screen.getByText(/logout/i);
    await user.click(logoutBtn);

    expect(window.confirm).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  test('4. CommentsPage affiche la liste des commentaires', async () => {
    getComments.mockResolvedValue({
      data: [
        { id: 1, content: 'Test comment', userId: 1, taskId: 5, createdAt: '2025-01-01' }
      ]
    });

    render(
      <MemoryRouter initialEntries={['/comments']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/all comments/i)).toBeInTheDocument();
      expect(screen.getByText(/test comment/i)).toBeInTheDocument();
    });
  });

  test('5. CommentView affiche un commentaire', async () => {
    getUser.mockResolvedValue({ data: { id: 1, username: 'admin' } });

    render(
      <MemoryRouter initialEntries={['/comments/1']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/comment #1/i)).toBeInTheDocument();
    });
  });

  test('6. Suppression d\'un commentaire', async () => {
    const user = userEvent.setup();
    getComments.mockResolvedValue({
      data: [{ id: 1, content: 'Delete me', userId: 1, taskId: 5, createdAt: '2025-01-01' }]
    });

    render(
      <MemoryRouter initialEntries={['/comments']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/delete me/i)).toBeInTheDocument());

    const deleteBtn = screen.getAllByRole('button', { name: /delete/i })[0];
    window.confirm = jest.fn(() => true);

    await user.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText(/delete me/i)).not.toBeInTheDocument();
  });

  test('7. Ajout d\'un commentaire dans TaskView', async () => {
    const user = userEvent.setup();
    getTasks.mockResolvedValue({ data: [{ id: 1, title: 'Test Task' }] });
    getComments.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/tasks/1']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/test task/i)).toBeInTheDocument());

    const textarea = screen.getByPlaceholderText(/write a comment/i);
    const submitBtn = screen.getByText(/post comment/i);

    await user.type(textarea, 'Nouveau commentaire');
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/comment added/i)).toBeInTheDocument();
    });
  });
});