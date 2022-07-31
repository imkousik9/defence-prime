import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContext {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
}

const authContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        Router.push('/');
      });
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email, password, firstName, lastName })
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        Router.push('/');
      });
  };

  const signOut = () => {
    setLoading(true);
    fetch('/api/auth/logout').then(() => {
      setUser(null);
      setLoading(false);
      Router.push('/');
    });
  };

  const getMe = async () => {
    await fetch('/api/auth/me')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMe();
  }, []);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
}
