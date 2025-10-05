import { useAppDispatch, useAppSelector } from "../store";
import { login, logout, register } from "../store/authSlice";
import { LoginInput, RegisterInput } from "../types/user";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, status, error } = useAppSelector((s) => s.auth);

  return {
    user,
    isAuthenticated,
    status,
    error,
    login: (input: LoginInput) => dispatch(login(input)),
    register: (input: RegisterInput) => dispatch(register(input)),
    logout: () => dispatch(logout()),
  };
}

