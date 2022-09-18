import { FormEvent, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useAuth } from 'lib';
import type { NextPage } from 'next';

import { ChevronRightIcon } from '@heroicons/react/solid';

import style from 'styles/Auth.module.css';

const Login: NextPage = () => {
  const { signIn, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    signIn(email, password);
  };

  const loginTestUserHandler = (e: FormEvent) => {
    e.preventDefault();
    signIn('admin@mail.com', 'admin712407');
  };

  return (
    <>
      <Head>
        <title>defence prime</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={style.auth}>
        <div className={style.auth_container}>
          <div className={style.auth_title}>
            <h2>Sign In</h2>
          </div>
          <form
            className={style.auth_main}
            onSubmit={(e) => {
              loginHandler(e);
            }}
          >
            <div className={style.auth_email}>
              <label htmlFor="mail">Email Address</label>
              <input
                placeholder="test@mail.com"
                className={style.text_input}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className={style.auth_password}>
              <label htmlFor="pwd">Password</label>
              <input
                placeholder="***********"
                className={style.text_input}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                required
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <div className={style.auth_checkbox}>
              <label className={style.select_input}>
                <input
                  type="checkbox"
                  name="light"
                  className={style.checkbox_input}
                  value=""
                />
                <span>Remember Me</span>
              </label>
              <NextLink href="/forget-password">
                <a>Forgot your Password?</a>
              </NextLink>
            </div>

            <div
              className={style.auth_test_btn}
              onClick={(e) => {
                loginTestUserHandler(e);
              }}
            >
              Login with Test Credentials
            </div>

            <button className={style.auth_btn} type="submit" disabled={loading}>
              Log In
            </button>

            <NextLink href="/signup">
              <a className={style.auth_link}>
                Create New Account
                <ChevronRightIcon className={style.auth_icon} />
              </a>
            </NextLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
