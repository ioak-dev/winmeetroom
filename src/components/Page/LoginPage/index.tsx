import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.scss';
import Logo from './Logo';
import { setSessionValue } from '../../../utils/SessionUtils';
import {
  AuthliteComponents,
  AuthliteTypes,
  AuthliteAuthenticationService,
} from 'authlite';

interface Props {
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';
const apiKey = process.env.REACT_APP_ONEAUTH_API_KEY || '';
const environment: any = process.env.REACT_APP_ENVIRONMENT || 'local';

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("**login page");
  }, [])

  return (
    <div>
      Login page
    </div>
  );
};

export default LoginPage;
