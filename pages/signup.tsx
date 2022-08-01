import { useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useAuth } from 'lib';
import type { NextPage } from 'next';
import { ChevronRightIcon } from '@heroicons/react/solid';

import style from 'styles/Auth.module.css';

const Signup: NextPage = () => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const signUpHandler = () => {
    if (email && password && firstName && lastName !== '') {
      signUp(firstName, lastName, email, password);
    }
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
            <h2>Sign Up</h2>
          </div>
          <form className={style.auth_main}>
            <div className={style.auth_fullname}>
              <div className={style.auth_name}>
                <label htmlFor="firstname">First Name</label>
                <input
                  placeholder="Admin"
                  className={style.text_input}
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>

              <div className={style.auth_name}>
                <label htmlFor="lastname">Last Name</label>
                <input
                  placeholder="Test"
                  className={style.text_input}
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
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
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <div className={style.auth_checkbox}>
              <label className={style.select_input}>
                <input
                  type="checkbox"
                  name="light"
                  className={style.checkbox_input}
                  value=""
                />
                <span>I accept all Terms & Conditions</span>
              </label>
            </div>

            <div className={style.auth_btn} onClick={signUpHandler}>
              Create New Account
            </div>

            <NextLink href="/login">
              <a className={style.auth_link}>
                Already have an account
                <ChevronRightIcon className={style.auth_icon} />
              </a>
            </NextLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
