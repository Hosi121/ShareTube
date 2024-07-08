import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Login from '../Login';
import { login } from '../../../services/authService';

// authServiceのモック
jest.mock('../../../services/authService', () => ({
  login: jest.fn(),
}));

// useNavigateのモック
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  let container: HTMLDivElement | null = null;
  let root: any = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it('renders login form', () => {
    act(() => {
      root.render(<Login />);
    });
    
    const emailInput = container!.querySelector('input[type="email"]');
    const passwordInput = container!.querySelector('input[type="password"]');
    const submitButton = container!.querySelector('button[type="submit"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(submitButton!.textContent).toBe('ログイン');
  });

  it('allows entering email and password', () => {
    act(() => {
      root.render(<Login />);
    });

    const emailInput = container!.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = container!.querySelector('input[type="password"]') as HTMLInputElement;

    act(() => {
      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      passwordInput.value = 'password123';
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls login service and navigates on successful login', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', created_at: '2023-01-01' };
    (login as jest.Mock).mockResolvedValue(mockUser);

    act(() => {
      root.render(<Login />);
    });

    const emailInput = container!.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = container!.querySelector('input[type="password"]') as HTMLInputElement;
    const form = container!.querySelector('form') as HTMLFormElement;

    act(() => {
      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      passwordInput.value = 'password123';
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays error message on login failure', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    act(() => {
      root.render(<Login />);
    });

    const emailInput = container!.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = container!.querySelector('input[type="password"]') as HTMLInputElement;
    const form = container!.querySelector('form') as HTMLFormElement;

    act(() => {
      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));
      passwordInput.value = 'wrongpassword';
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    const errorMessage = container!.querySelector('p');
    expect(errorMessage!.textContent).toContain('ログインに失敗しました');
  });
});