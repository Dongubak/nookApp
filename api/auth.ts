import axios from 'axios';
import { useSession } from '@/context/SessionProvider';

const API_URL = process.env.EXPO_PUBLIC_DUMMY_LAP_API;

export function useAuth() {
  const { signIn, signOut } = useSession();

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (!response.data?.token) {
        throw new Error('Invalid login response');
      }

      signIn(response.data.token); // ✅ 세션 저장 (자동 로그인)
      return response.data.token;
    } catch (error: any) {
      throw error;
    }
  };

  const registerUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });

      if (!response.data?.token) {
        throw new Error('Invalid registration response');
      }

      signIn(response.data.token);
      return response.data.token;
    } catch (error: any) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    }
    signOut();
  };

  return { loginUser, registerUser, logoutUser };
}
