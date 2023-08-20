import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LoginMethod from './LoginMethod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, ThemeType } from 'basicui';
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

  const onSignin = (event: any) => {
    event.preventDefault();
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
      <form onSubmit={onSignin}>
        <h4>Sign in to choose your room mate</h4>
        <Input autoFocus name="email" onInput={handleChange} value={state.email} label='Email' />
        <Input name="password" onInput={handleChange} value={state.password} label='Password' />
        <Button type="submit" theme={ThemeType.primary}>Sign in</Button>
        <Button onClick={onSignin}>Forgot password?</Button>
      </form>
    </div>
  );
};

export default Login;
