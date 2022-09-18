import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const authContext = createContext<ReturnType<typeof useProvideAuth>>(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async (email: string, password: string) => {
    let responseClone;
    setError('');
    setLoading(true);
    await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        responseClone = response.clone();
        return response.json();
      })
      .then((data) => {
        responseClone = null;
        setUser(data);
        setLoading(false);
        Router.push('/');
      })
      .catch(() => {
        responseClone.text().then((bodyText) => {
          setLoading(false);
          setError(bodyText);
        });
      });
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    let responseClone;
    setError('');
    setLoading(true);
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email, password, firstName, lastName })
    })
      .then((response) => {
        responseClone = response.clone();
        return response.json();
      })
      .then((data) => {
        responseClone = null;
        setUser(data);
        setLoading(false);
        Router.push('/');
      })
      .catch(() => {
        responseClone.text().then((bodyText) => {
          setLoading(false);
          setError(bodyText);
        });
      });
  };

  const signOut = () => {
    fetch('/api/auth/logout').then(() => {
      setUser(null);
      Router.push('/');
    });
  };

  const getMe = async () => {
    await fetch('/api/auth/me')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getMe();
  }, []);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut
  };
}
