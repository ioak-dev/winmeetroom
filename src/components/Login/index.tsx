import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LoginMethod from './LoginMethod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input } from 'basicui';
import { signinUser } from './service';

interface Props {
  auth: any;
  onSignin: any;
}

const Login = (props: Props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
  }, []);

  const onSignin = () => {
    signinUser(state).then((response: any) => {
      console.log(response);
      props.onSignin(response.accessToken);
    })
  }

  const handleChange = (event: any) => {
    setState({
      ...state, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className="login">
      <Input name="email" onInput={handleChange} value={state.email} label='Email' />
      <Input name="password" onInput={handleChange} value={state.password} label='Password' />
      <Button onClick={onSignin}>Sign in</Button>
    </div>
  );
};

export default Login;
