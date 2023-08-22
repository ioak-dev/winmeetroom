import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LoginMethod from './LoginMethod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, ThemeType } from 'basicui';
import { sendPassword, signinUser } from './service';

interface Props {
  auth: any;
  onSignin: any;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [showSendPassword, setShowSendPassword] = useState(false);
  const [message, setMessage] = useState('');

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const onSignin = (event: any) => {
    event.preventDefault();
    signinUser(state).then((response: any) => {
      console.log(response);
      props.onSignin(response.accessToken);
    })
  }

  const onSendPassword = (event: any) => {
    event.preventDefault();
    sendPassword(state.email).then((response: any) => {
      console.log(response);
      setMessage("Password sent to your email. Please check your email for further instructions.")
    })
  }

  const handleChange = (event: any) => {
    setState({
      ...state, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className="login">
      <form onSubmit={showSendPassword ? onSendPassword : onSignin}>
        <h4>Sign in to choose your room mate</h4>
        {message && <div>{message}</div>}
        <Input autoFocus name="email" onInput={handleChange} value={state.email} label='Email' />
        {!showSendPassword && <Input name="password" onInput={handleChange} value={state.password} label='Password' />}
        {!showSendPassword && <Button type="submit" theme={ThemeType.primary}>Sign in</Button>}
        {!showSendPassword && <Button onClick={() => { setShowSendPassword(true); setMessage('') }}>Forgot password?</Button>}
        {showSendPassword && <Button type="submit" theme={ThemeType.primary}>Send password</Button>}
        {showSendPassword && <Button onClick={() => { setShowSendPassword(false); setMessage('') }}>Sign in</Button>}
      </form>
    </div>
  );
};

export default Login;
